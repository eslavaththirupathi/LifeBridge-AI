import pandas as pd
import joblib
from pathlib import Path

from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

BASE_DIR = Path(__file__).resolve().parent

train_path = BASE_DIR / "dataset" / "Training.csv"
test_path = BASE_DIR / "dataset" / "Testing.csv"

print("Reading datasets...")

train = pd.read_csv(train_path, encoding="cp850")
test = pd.read_csv(test_path, encoding="cp850")

X_train = train.drop("Prognosis", axis=1)
y_train = train["Prognosis"]

X_test = test.drop("Prognosis", axis=1)
y_test = test["Prognosis"]

print("Training Decision Tree Model...")

model = DecisionTreeClassifier(
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy : {accuracy * 100:.2f}%")

joblib.dump(model, BASE_DIR / "disease_model.pkl")

print("Model saved successfully!")