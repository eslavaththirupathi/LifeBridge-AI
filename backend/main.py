from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.ml.predictor import predict_disease

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from Vercel and localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DiagnosisRequest(BaseModel):
    age: int
    gender: str
    symptoms: str
    duration: str
    history: str


@app.get("/")
def home():
    return {
        "message": "LifeBridge AI Backend Running 🚑"
    }


@app.post("/predict")
def predict(data: DiagnosisRequest):

    result = predict_disease(data.symptoms)

    confidence = result["confidence"]

    if confidence >= 90:
        severity = "High"
    elif confidence >= 70:
        severity = "Medium"
    else:
        severity = "Low"

    return {
        "disease": result["disease"],
        "confidence": confidence,
        "severity": severity,
        "firstAid": "Consult a qualified doctor. This AI prediction is only an assistive recommendation."
    }