import os
import joblib
import gdown

MODEL_PATH = os.path.join(os.path.dirname(__file__), "disease_model.pkl")
GDRIVE_FILE_ID = "1YOV-dXHdRHY6KqTjTWoETQOlU5WbZmbX"

model = None  # Do not load immediately on boot

def get_model():
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
            gdown.download(url, MODEL_PATH, quiet=False)
        model = joblib.load(MODEL_PATH)
    return model

def predict_disease(symptoms):
    loaded_model = get_model()
    # run prediction using loaded_model
    ...