import { useState } from "react";
import { API_BASE_URL } from "../config";

export default function Diagnosis() {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "Male",
    symptoms: "",
    duration: "1 day",
    history: "None"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction from server");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Unable to connect to diagnosis server. Note that Render free tier can take ~30s to wake up on first load.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>AI Symptom Checker</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Gender: </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Symptoms: </label>
          <textarea
            name="symptoms"
            rows="4"
            style={{ width: "100%" }}
            placeholder="Describe your symptoms (e.g., fever, headache, fatigue)"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Get Diagnosis"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Diagnosis Results</h3>
          <p><strong>Predicted Condition:</strong> {result.disease}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Severity:</strong> {result.severity}</p>
          <p style={{ fontStyle: "italic", fontSize: "0.9em" }}><strong>Note:</strong> {result.firstAid}</p>
        </div>
      )}
    </div>
  );
}