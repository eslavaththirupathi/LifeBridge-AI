import { useState } from "react";

const API_BASE_URL = "https://lifebridge-ai-backend.onrender.com";

export default function Diagnosis() {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "Male",
    symptoms: "",
    duration: "1 day",
    history: "None",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        throw new Error("Backend server is not responding.");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  const severityColor = () => {
    if (!result) return "#2563eb";

    if (result.severity === "High") return "#dc2626";

    if (result.severity === "Moderate") return "#f59e0b";

    return "#16a34a";
  };

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "40px auto",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1d4ed8" }}>
        🩺 AI Disease Prediction
      </h1>

      <p style={{ color: "#555" }}>
        Enter symptoms separated by commas.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          style={inputStyle}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <textarea
          name="symptoms"
          rows="5"
          placeholder="Example: fever,cough,headache"
          value={formData.symptoms}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get Diagnosis"}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: 20,
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 12,
            background: "#f8fafc",
            boxShadow: "0 0 10px rgba(0,0,0,.08)",
          }}
        >
          <h2>Prediction Result</h2>

          <h3 style={{ color: "#2563eb" }}>
            {result.disease}
          </h3>

          <p>
            <strong>Confidence:</strong>{" "}
            {result.confidence}%
          </p>

          <div
            style={{
              width: "100%",
              background: "#ddd",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: `${result.confidence}%`,
                height: 12,
                background: "#2563eb",
              }}
            />
          </div>

          <p>
            <strong>Severity:</strong>{" "}
            <span
              style={{
                color: severityColor(),
                fontWeight: "bold",
              }}
            >
              {result.severity}
            </span>
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{result.description}</p>

          <h4>First Aid</h4>

          <p>{result.firstAid}</p>

          {result.precautions && (
            <>
              <h4>Precautions</h4>

              <ul>
                {result.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 14,
  border: "none",
  borderRadius: 8,
  background: "#2563eb",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};