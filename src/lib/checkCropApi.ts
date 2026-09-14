// API helper for the Fasal Rakshak crop-disease backend (FastAPI).
//
// Configure the backend URL by setting VITE_API_BASE_URL (e.g. in a `.env.local`
// file or the Vercel dashboard). If unset, it defaults to a local server.

export interface CropDiseaseInfo {
  name: string;
  cause: string;
  symptoms: string;
  treatment: string;
}

export interface CropDiseasePrediction {
  method?: 'few_shot' | 'trained_classifier';
  disease_key: string;
  disease_name: string;
  confidence: number;
  low_confidence: boolean;
  info: CropDiseaseInfo;
  similarities?: Record<string, number>;
}

const DEFAULT_API_BASE_URL = 'http://localhost:8100';

export function getApiBaseUrl(): string {
  const fromEnv = (import.meta as any).env?.VITE_API_BASE_URL;
  return (fromEnv as string | undefined)?.trim() || DEFAULT_API_BASE_URL;
}

/**
 * Sends a crop photo to the backend and returns the disease prediction.
 * Accepts either a File (from the file picker) or a URL (sample images).
 */
export async function detectCropDisease(
  image: File | string,
): Promise<CropDiseasePrediction> {
  let file: File;

  if (typeof image === 'string') {
    // Fetch a remote sample image and wrap it as a File
    const resp = await fetch(image);
    if (!resp.ok) throw new Error(`Could not fetch sample image (${resp.status})`);
    const blob = await resp.blob();
    file = new File([blob], 'sample.jpg', { type: blob.type || 'image/jpeg' });
  } else {
    file = image;
  }

  const formData = new FormData();
  formData.append('file', file);

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Prediction request failed: ${res.status}`);
  }

  return res.json();
}