from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import your prediction function from app/ml/predictor.py
from app.ml.predictor import predict_disease

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Input Schema matching Diagnosis.jsx
class DiagnosisRequest(BaseModel):
    symptoms: str
    age: int = 25
    gender: str = "Male"
    duration: str = "1 day"
    history: str = "None"

@app.get("/")
def read_root():
    return {"message": "LifeBridge AI Backend is Running!"}

# 2. Prediction Endpoint
@app.post("/predict")
def predict(data: DiagnosisRequest):
    try:
        predicted_condition = predict_disease(data.symptoms)
        
        return {
            "disease": str(predicted_condition),
            "confidence": 92,
            "severity": "Moderate",
            "firstAid": "Rest well, stay hydrated, and consult a medical professional if symptoms worsen."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))