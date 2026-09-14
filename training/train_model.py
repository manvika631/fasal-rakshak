"""
Train a crop disease classification model using transfer learning.

Run this in Google Colab (free GPU) for speed:
1. Upload this script, or copy its contents into a Colab notebook cell.
2. Upload/mount your `data/train` and `data/val` folders (e.g. via Google Drive).
3. Run all cells. It will save `crop_disease_model.h5` at the end.

Expected folder layout:
    data/
      train/
        Tomato___Early_blight/img1.jpg, img2.jpg, ...
        Tomato___healthy/...
        Potato___Late_blight/...
      val/
        (same class folders, held-out images)
"""

import tensorflow as tf
from tensorflow.keras import layers, models
import json

# ---------------------------------------------------------------------------
# 1. Config
# ---------------------------------------------------------------------------
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_STAGE1 = 10   # training only the new top layers
EPOCHS_STAGE2 = 5    # fine-tuning the base model's last layers
TRAIN_DIR = "data/train"
VAL_DIR = "data/val"

# ---------------------------------------------------------------------------
# 2. Load datasets
# ---------------------------------------------------------------------------
train_ds = tf.keras.utils.image_dataset_from_directory(
    TRAIN_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)
val_ds = tf.keras.utils.image_dataset_from_directory(
    VAL_DIR, image_size=IMG_SIZE, batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
print("Detected classes:", class_names)

# Save class order — the backend MUST use this exact order when decoding predictions
with open("class_names.json", "w") as f:
    json.dump(class_names, f, indent=2)

# Normalize pixel values to [0, 1]
normalization_layer = layers.Rescaling(1.0 / 255)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

# Light data augmentation to reduce overfitting on small datasets
data_augmentation = models.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

# ---------------------------------------------------------------------------
# 3. Build model (transfer learning on MobileNetV2)
# ---------------------------------------------------------------------------
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet"
)
base_model.trainable = False  # freeze for stage 1

inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
x = data_augmentation(inputs)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
x = layers.Dense(128, activation="relu")(x)
outputs = layers.Dense(len(class_names), activation="softmax")(x)
model = tf.keras.Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

# ---------------------------------------------------------------------------
# 4. Stage 1: train the new top layers only
# ---------------------------------------------------------------------------
print("\n--- Stage 1: training top layers ---")
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS_STAGE1)

# ---------------------------------------------------------------------------
# 5. Stage 2: fine-tune the last layers of the base model
# ---------------------------------------------------------------------------
base_model.trainable = True
# Freeze everything except the last ~20 layers
for layer in base_model.layers[:-20]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),  # low LR for fine-tuning
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

print("\n--- Stage 2: fine-tuning ---")
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS_STAGE2)

# ---------------------------------------------------------------------------
# 6. Save
# ---------------------------------------------------------------------------
model.save("crop_disease_model.h5")
print("\nSaved model to crop_disease_model.h5")
print("Saved class order to class_names.json — copy both into backend/")
