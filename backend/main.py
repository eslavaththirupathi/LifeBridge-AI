from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.ml.predictor import predict_disease

app = FastAPI(
    title="LifeBridge AI API",
    version="1.0.0",
    description="AI-powered disease prediction backend for LifeBridge AI"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change to your Vercel URL later if desired
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# Request Model
# -------------------------------

class DiagnosisRequest(BaseModel):
    age: int
    gender: str
    symptoms: str
    duration: str
    history: str


# -------------------------------
# Home API
# -------------------------------

@app.get("/")
def home():
    return {
        "message": "LifeBridge AI Backend Running 🚑"
    }


# -------------------------------
# Prediction API
# -------------------------------

@app.post("/predict")
def predict(data: DiagnosisRequest):

    try:
        result = predict_disease(data.symptoms)

        disease = result["disease"]
        confidence = float(result["confidence"])

        if confidence >= 85:
            severity = "High"
        elif confidence >= 65:
            severity = "Moderate"
        else:
            severity = "Low"

        return {
            "disease": disease,
            "confidence": confidence,
            "severity": severity,

            "description":
                f"Based on the symptoms reported ('{data.symptoms}'), "
                f"the AI model predicts the most probable condition as {disease}.",

            "firstAid":
                "Stay hydrated, get adequate rest, avoid self-medication, "
                "and consult a qualified healthcare professional.",

            "precautions": [
                "Drink plenty of water",
                "Take sufficient rest",
                "Eat nutritious food",
                "Monitor symptoms regularly",
                "Consult a doctor if symptoms worsen"
            ]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )