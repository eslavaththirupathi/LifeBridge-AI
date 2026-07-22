import os
import joblib
import gdown

MODEL_PATH = os.path.join(os.path.dirname(__file__), "disease_model.pkl")
GDRIVE_FILE_ID = "1YOV-dXHdRHY6KqTjTWoETQOlU5WbZmbX"

# Set model variable to None globally
model = None

def get_model():
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
            gdown.download(url, MODEL_PATH, quiet=False)
        model = joblib.load(MODEL_PATH)
    return model

def predict_disease(symptoms):
    active_model = get_model() # Loads lazily
    # perform prediction using active_model