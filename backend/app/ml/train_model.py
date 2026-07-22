import pandas as pd
import joblib
from pathlib import Path

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# -------------------------------
# Paths
# -------------------------------

BASE_DIR = Path(__file__).resolve().parent

train_path = BASE_DIR / "dataset" / "Training.csv"
test_path = BASE_DIR / "dataset" / "Testing.csv"

# -------------------------------
# Load Dataset
# -------------------------------

print("Loading datasets...\n")

train = pd.read_csv(train_path, encoding="cp850")
test = pd.read_csv(test_path, encoding="cp850")

print("Datasets loaded successfully!\n")

# -------------------------------
# Split Features & Labels
# -------------------------------

X_train = train.drop("Prognosis", axis=1)
y_train = train["Prognosis"]

X_test = test.drop("Prognosis", axis=1)
y_test = test["Prognosis"]

print(f"Training Samples : {len(X_train)}")
print(f"Testing Samples  : {len(X_test)}")
print(f"Number of Symptoms : {X_train.shape[1]}")
print(f"Number of Diseases : {y_train.nunique()}")

print("\nTraining Model...\n")

# -------------------------------
# Train Random Forest
# -------------------------------

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model Training Completed!\n")

# -------------------------------
# Predictions
# -------------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("=" * 50)
print(f"Accuracy : {accuracy * 100:.2f}%")
print("=" * 50)

print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

# -------------------------------
# Save Model
# -------------------------------

model_file = BASE_DIR / "disease_model.pkl"

joblib.dump(model, model_file)

print("\nModel Saved Successfully!")
print(f"\nLocation : {model_file}")