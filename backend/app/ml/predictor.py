import os
import joblib
import gdown

MODEL_PATH = os.path.join(os.path.dirname(__file__), "disease_model.pkl")
# Your Google Drive file ID
GDRIVE_FILE_ID = "1YOV-dXHdRHY6KqTjTWoETQOlU5WbZmbX"

def load_model():
    # If the file does not exist on the server, download it from Google Drive
    if not os.path.exists(MODEL_PATH):
        print("Downloading ML model from Google Drive...")
        url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
        gdown.download(url, MODEL_PATH, quiet=False)
    
    print("Loading model into memory...")
    return joblib.load(MODEL_PATH)

# Load the model
model = load_model()