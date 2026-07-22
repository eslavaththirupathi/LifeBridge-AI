from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.ml.predictor import predict_disease

app = FastAPI(
    title="LifeBridge AI API",
    version="1.0.0"
)

# 1. CORS Configuration: Allow requests from all origins (Fixes Vercel frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Input Request Schema (Matches what frontend sends)
class DiagnosisRequest(BaseModel):
    age: int = 25
    gender: str = "Male"
    symptoms: str
    duration: str = "1 day"
    history: str = "None"


@app.get("/")
def home():
    return {
        "message": "LifeBridge AI Backend Running 🚑"
    }


@app.post("/predict")
def predict(data: DiagnosisRequest):
    try:
        # Call predictor function
        result = predict_disease(data.symptoms)

        # Handle prediction output dictionary
        disease = result.get("disease", "Condition Analysis Required")
        confidence = result.get("confidence", 85.0)

        # Assign Severity dynamically based on model confidence
        if confidence >= 90:
            severity = "High"
        elif confidence >= 70:
            severity = "Medium"
        else:
            severity = "Low"

        # Return structured JSON to React Frontend
        return {
            "disease": disease,
            "confidence": confidence,
            "severity": severity,
            "firstAid": "Consult a qualified healthcare professional. This AI prediction is an assistive recommendation based on reported symptoms."
        }

    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))