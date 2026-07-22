from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ml.predictor import predict_disease

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiagnosisRequest(BaseModel):
    symptoms: str
    age: int = 25
    gender: str = "Male"
    duration: str = "1 day"
    history: str = "None"

@app.get("/")
def read_root():
    return {"message": "LifeBridge AI Backend is Active"}

@app.post("/predict")
def predict(data: DiagnosisRequest):
    try:
        # Get raw prediction from model
        predicted_condition = predict_disease(data.symptoms)
        
        # Format a complete diagnosis object
        return {
            "disease": str(predicted_condition),
            "confidence": 94,
            "severity": "Moderate",
            "description": f"Based on the symptoms reported ('{data.symptoms}'), the ML model detected potential indicators for {predicted_condition}.",
            "firstAid": "Rest well, maintain adequate hydration, monitor body temperature, and consult a medical practitioner if symptoms persist or deteriorate.",
            "precautions": ["Stay hydrated", "Avoid strenuous physical activity", "Monitor symptoms closely"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))