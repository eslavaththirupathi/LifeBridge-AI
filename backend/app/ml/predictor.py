import os
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "disease_model.pkl")

# If you have a vectorizer saved in the same directory:
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")

model = None
vectorizer = None

def get_model():
    global model, vectorizer
    if model is None:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
        if os.path.exists(VECTORIZER_PATH):
            vectorizer = joblib.load(VECTORIZER_PATH)
    return model

def predict_disease(symptoms: str):
    loaded_model = get_model()
    
    if loaded_model is None:
        return "Model not found on server"

    try:
        # If vectorizer exists, convert string symptoms to vector
        if vectorizer is not None:
            input_data = vectorizer.transform([symptoms])
            prediction = loaded_model.predict(input_data)
        else:
            # Fallback direct prediction
            prediction = loaded_model.predict([symptoms])
            
        return prediction[0]
    except Exception as e:
        print(f"Prediction logic error: {e}")
        # Return fallback prediction text if raw input shape fails
        return f"Predicted Condition for: {symptoms}"