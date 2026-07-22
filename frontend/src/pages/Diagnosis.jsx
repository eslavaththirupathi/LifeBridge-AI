import { useState } from "react";

// Update this to your exact live Render backend URL
const API_BASE_URL = "https://lifebridge-ai-backend.onrender.com";

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
        throw new Error("Unable to fetch response from backend server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#1a365d" }}>AI Symptom Checker</h2>
      <p style={{ color: "#4a5568", marginBottom: "20px" }}>Enter your symptom details below to generate an AI diagnosis report.</p>

      <form onSubmit={handleSubmit} style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Gender:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Symptoms:</label>
          <textarea
            name="symptoms"
            rows="4"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            placeholder="Describe your symptoms (e.g., high fever, severe headache, fatigue)"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#94a3b8" : "#2563eb",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Analyzing Symptoms..." : "Get Diagnosis"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px" }}>
          <strong>Error: </strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px" }}>
          <h3 style={{ color: "#166534", marginTop: 0 }}>Diagnosis Results</h3>
          <p><strong>Predicted Condition:</strong> <span style={{ fontSize: "18px", color: "#15803d", fontWeight: "bold" }}>{result.disease}</span></p>
          <p><strong>Model Confidence:</strong> {result.confidence}%</p>
          <p><strong>Severity Level:</strong> {result.severity}</p>
          
          {result.description && <p><strong>Details:</strong> {result.description}</p>}
          
          {result.firstAid && (
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #dcfce7" }}>
              <strong>Recommended First Aid / Care:</strong>
              <p style={{ margin: "5px 0 0 0", color: "#166534" }}>{result.firstAid}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}