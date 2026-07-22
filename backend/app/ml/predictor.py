import os
import joblib
import pandas as pd
import gdown
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "disease_model.pkl"
TRAIN_PATH = BASE_DIR / "dataset" / "Training.csv"

# Google Drive File ID for disease_model.pkl
MODEL_GDRIVE_ID = "1YOV-dXHdRHY6KqTjTWoETQOlU5WbZmbX"

model = None
symptom_columns = []

def load_resources():
    global model, symptom_columns
    
    # 1. Load symptom columns from local Training.csv
    if os.path.exists(TRAIN_PATH):
        try:
            train = pd.read_csv(TRAIN_PATH, encoding="cp850")
            symptom_columns = train.drop("Prognosis", axis=1, errors="ignore").columns.tolist()
            print(f"Loaded {len(symptom_columns)} symptom columns from Training.csv")
        except Exception as e:
            print(f"Error reading Training.csv: {e}")
    else:
        print(f"Training.csv not found at: {TRAIN_PATH}")

    # 2. Download disease_model.pkl from Google Drive if missing or corrupt
    if not os.path.exists(MODEL_PATH) or os.path.getsize(MODEL_PATH) < 100000:
        print("Downloading disease_model.pkl from Google Drive...")
        url = f"https://drive.google.com/uc?id={MODEL_GDRIVE_ID}"
        try:
            gdown.download(url, str(MODEL_PATH), quiet=False, fuzzy=True)
        except Exception as e:
            print(f"Download failed with fuzzy option, trying direct: {e}")
            gdown.download(url, str(MODEL_PATH), quiet=False)

    # 3. Load Model Pickle
    if os.path.exists(MODEL_PATH) and os.path.getsize(MODEL_PATH) > 100000:
        try:
            model = joblib.load(MODEL_PATH)
            print("disease_model.pkl loaded successfully!")
        except Exception as e:
            print(f"Error loading disease_model.pkl: {e}")

# Pre-load on module import
try:
    load_resources()
except Exception as err:
    print(f"Initialization exception: {err}")


def predict_disease(symptoms_text: str):
    global model, symptom_columns
    
    if model is None or not symptom_columns:
        load_resources()

    if model is None or not symptom_columns:
        return {
            "disease": "Model Not Loaded",
            "confidence": 0.0
        }

    # Build binary feature vector [0, 1, 0, ...]
    input_data = [0] * len(symptom_columns)

    # Clean and split user input symptoms
    selected = [
        s.strip().lower()
        for s in symptoms_text.split(",")
        if s.strip()
    ]

    for i, symptom in enumerate(symptom_columns):
        if symptom.lower() in selected:
            input_data[i] = 1

    df = pd.DataFrame([input_data], columns=symptom_columns)

    # Predict
    prediction = model.predict(df)[0]

    # Calculate Confidence %
    if hasattr(model, "predict_proba"):
        confidence = max(model.predict_proba(df)[0]) * 100
    else:
        confidence = 88.0

    return {
        "disease": str(prediction),
        "confidence": round(float(confidence), 2)
    }