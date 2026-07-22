import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "disease_model.pkl"
TRAIN_PATH = BASE_DIR / "dataset" / "Training.csv"

# Load model
model = joblib.load(MODEL_PATH)

# Load symptom names
train = pd.read_csv(TRAIN_PATH, encoding="cp850")
symptom_columns = train.drop("Prognosis", axis=1).columns.tolist()


def predict_disease(symptoms_text: str):

    input_data = [0] * len(symptom_columns)

    selected = [
        s.strip().lower()
        for s in symptoms_text.split(",")
        if s.strip()
    ]

    for i, symptom in enumerate(symptom_columns):
        if symptom.lower() in selected:
            input_data[i] = 1

    df = pd.DataFrame([input_data], columns=symptom_columns)

    prediction = model.predict(df)[0]

    confidence = 90.0

    if hasattr(model, "predict_proba"):
        confidence = max(model.predict_proba(df)[0]) * 100

    return {
        "disease": str(prediction),
        "confidence": round(float(confidence), 2)
    }