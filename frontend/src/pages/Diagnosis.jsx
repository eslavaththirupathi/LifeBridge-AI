import { useState } from "react";

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

    // Create payload matching common FastAPI input schemas
    const payload = {
      symptoms: formData.symptoms,
      age: Number(formData.age),
      gender: formData.gender,
      duration: formData.duration,
      history: formData.history
    };

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.detail || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend Response Data:", data);
      setResult(data);
    } catch (err) {
      console.error("Diagnosis Request Error:", err);
      setError(
        err.message || 
        "Unable to connect to diagnosis server. Render free instances sleep after inactivity and can take ~30–40 seconds to wake up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>AI Symptom Checker</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Gender:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Symptoms:</label>
          <textarea
            name="symptoms"
            rows="4"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            placeholder="Describe your symptoms (e.g., fever, headache, fatigue)"
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: loading ? "#ccc" : "#0070f3", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px", 
            cursor: loading ? "not-allowed" : "pointer" 
          }}
        >
          {loading ? "Analyzing Symptoms (Waking server...)" : "Get Diagnosis"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: "15px", padding: "10px", border: "1px solid red", borderRadius: "5px" }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #0070f3", borderRadius: "8px", backgroundColor: "#f0f8ff" }}>
          <h3>Diagnosis Results</h3>
          <p><strong>Predicted Condition:</strong> {result.disease || result.predicted_disease || result.prediction || "N/A"}</p>
          {(result.confidence || result.confidence_score) && (
            <p><strong>Confidence:</strong> {result.confidence || result.confidence_score}%</p>
          )}
          {result.severity && <p><strong>Severity:</strong> {result.severity}</p>}
          {(result.firstAid || result.first_aid || result.recommendation) && (
            <p style={{ fontStyle: "italic", fontSize: "0.95em" }}>
              <strong>Note/First Aid:</strong> {result.firstAid || result.first_aid || result.recommendation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}