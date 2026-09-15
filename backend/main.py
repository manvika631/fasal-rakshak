"""
Backend API for Fasal Rakshak crop disease detection.

Run locally:
    uvicorn main:app --reload --port 8000

Deploy: push this `backend/` folder to Render / Railway / Hugging Face Spaces.

How it works:
    - On startup, the server scans `known_images/<ClassName>/*.jpg` and computes
      a visual embedding for each reference image using MobileNetV2.
    - At predict time, the uploaded photo's embedding is compared against all
      known embeddings using cosine similarity.
    - This is a few-shot approach — it works even with 1 image per class.
      Add more images to `known_images/<ClassName>/` to improve accuracy.
    - If a trained `.h5` classifier exists (from training/train_model.py),
      the server prefers it over few-shot matching.
"""

import io
import json
import os
from pathlib import Path

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
IMG_SIZE = (224, 224)
ALLOWED_ORIGINS = [
    "https://sih-fasal-rakshak.vercel.app",
    "https://fasal-rakshak-project.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
]

BASE_DIR = Path(__file__).parent
KNOWN_IMAGES_DIR = BASE_DIR / "known_images"

app = FastAPI(title="Fasal Rakshak - Crop Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Feature extractor (MobileNetV2 — no classification head)
# ---------------------------------------------------------------------------
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet"
)
base_model.trainable = False

feature_extractor = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
])


def _extract_embedding(img: Image.Image) -> np.ndarray:
    """Resize, normalise, and return a 1280-d embedding for one image."""
    arr = np.array(img.convert("RGB").resize(IMG_SIZE))
    arr = tf.keras.applications.mobilenet_v2.preprocess_input(arr)
    batch = np.expand_dims(arr, axis=0)
    emb = feature_extractor(batch, training=False).numpy()[0]
    # L2-normalise so cosine similarity = dot product
    norm = np.linalg.norm(emb)
    if norm > 0:
        emb = emb / norm
    return emb


# ---------------------------------------------------------------------------
# Load few-shot references (known_images/<ClassName>/*.{jpg,jpeg,png})
# ---------------------------------------------------------------------------
# Stored as list of (class_name, embedding) tuples
_fewshot_references: list[tuple[str, np.ndarray]] = []
_class_names: list[str] = []

if KNOWN_IMAGES_DIR.exists():
    for class_dir in sorted(KNOWN_IMAGES_DIR.iterdir()):
        if not class_dir.is_dir():
            continue
        class_name = class_dir.name
        found = 0
        for img_path in sorted(class_dir.glob("*")):
            if img_path.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"):
                try:
                    img = Image.open(img_path)
                    emb = _extract_embedding(img)
                    _fewshot_references.append((class_name, emb))
                    found += 1
                except Exception as e:
                    print(f"  [warn] skipping {img_path.name}: {e}")
        if found:
            _class_names.append(class_name)
    print(f"[startup] Few-shot: loaded {len(_fewshot_references)} reference images "
          f"across {len(_class_names)} classes")
else:
    print(f"[startup] WARNING: {KNOWN_IMAGES_DIR} not found. No reference images loaded.")

# ---------------------------------------------------------------------------
# Optional: load trained classifier (produced by training/train_model.py)
# ---------------------------------------------------------------------------
_trained_model = None
_class_names_trained: list[str] | None = None

_model_path = BASE_DIR / "crop_disease_model.h5"
_names_path = BASE_DIR / "class_names.json"
_info_path = BASE_DIR / "disease_info.json"

if _model_path.exists() and _names_path.exists():
    try:
        _trained_model = tf.keras.models.load_model(str(_model_path))
        with open(_names_path) as f:
            _class_names_trained = json.load(f)
        print(f"[startup] Trained model loaded: {len(_class_names_trained)} classes")
    except Exception as e:
        print(f"[startup] WARNING: could not load trained model: {e}")

# ---------------------------------------------------------------------------
# Disease info knowledge base
# ---------------------------------------------------------------------------
_disease_info: dict = {}
if _info_path.exists():
    with open(_info_path) as f:
        _disease_info = json.load(f)


def _get_info(disease_key: str) -> dict:
    return _disease_info.get(disease_key, {
        "name": disease_key.replace("___", " - ").replace("_", " "),
        "cause": "Not available",
        "symptoms": "Not available",
        "treatment": "Not available",
    })


# ---------------------------------------------------------------------------
# API endpoints
# ---------------------------------------------------------------------------

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Fasal Rakshak disease detection API is running",
        "mode": "trained_classifier" if _trained_model is not None else "few_shot",
        "few_shot_classes": _class_names,
        "trained_classes": _class_names_trained,
        "few_shot_images_loaded": len(_fewshot_references),
    }


@app.get("/classes")
def list_classes():
    return {
        "few_shot_classes": _class_names,
        "trained_classes": _class_names_trained,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except Exception:
        return JSONResponse(
            {"detail": "Could not read the uploaded file as an image."}, status_code=400
        )

    # --- Branch 1: trained classifier (preferred if available) ---
    if _trained_model is not None and _class_names_trained is not None:
        processed = img.convert("RGB").resize(IMG_SIZE)
        arr = np.array(processed) / 255.0
        arr = np.expand_dims(arr, axis=0)

        preds = _trained_model.predict(arr)[0]
        idx = int(np.argmax(preds))
        label = _class_names_trained[idx]
        confidence = float(preds[idx])

        return {
            "method": "trained_classifier",
            "disease_key": label,
            "disease_name": _get_info(label).get("name", label),
            "confidence": round(confidence, 4),
            "low_confidence": confidence < 0.6,
            "info": _get_info(label),
        }

    # --- Branch 2: few-shot matching ---
    if not _fewshot_references:
        return JSONResponse(
            {
                "detail": "No reference images found. "
                "Add images to backend/known_images/<ClassName>/ and restart.",
            },
            status_code=503,
        )

    emb = _extract_embedding(img)

    # Compute cosine similarity against all references (embeddings are L2-normed)
    ref_embs = np.stack([e for _, e in _fewshot_references])
    sims = ref_embs @ emb  # shape: (N,)

    best_idx = int(np.argmax(sims))
    best_class, best_sim = _fewshot_references[best_idx][0], float(sims[best_idx])

    # Average similarity per class for a more robust confidence
    class_sims: dict[str, list[float]] = {}
    for (cls, e), sim in zip(_fewshot_references, sims):
        class_sims.setdefault(cls, []).append(float(sim))
    class_avg = {cls: float(np.mean(sims_list)) for cls, sims_list in class_sims.items()}
    ranked = sorted(class_avg.items(), key=lambda x: x[1], reverse=True)
    top_class = ranked[0][0]
    top_avg = ranked[0][1]

    # Map cosine similarity to a pseudo-confidence in [0, 1]
    # With L2-normalised embeddings, sim ranges from -1 to 1.
    # Shift and scale so high sim → high confidence.
    confidence = max(0.0, min(1.0, (top_avg + 1.0) / 2.0))

    # Compute second-best for uncertainty
    second_avg = ranked[1][1] if len(ranked) > 1 else -1.0
    margin = top_avg - second_avg

    return {
        "method": "few_shot",
        "disease_key": top_class,
        "disease_name": _get_info(top_class).get("name", top_class),
        "confidence": round(confidence, 4),
        "low_confidence": confidence < 0.55 or margin < 0.05,
        "similarities": {cls: round(float(s), 4) for cls, s in ranked},
        "info": _get_info(top_class),
    }