import { useState } from "react";
import ResultCard from "./ResultCard";
import api from "../services/api";

const SymptomForm = () => {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    symptoms: "",
    duration: "",
    history: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [result, setResult] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/predict", {
      age: Number(form.age),
      gender: form.gender,
      symptoms: form.symptoms,
      duration: form.duration,
      history: form.history,
    });

    setResult(response.data);
  } catch (error) {
    console.error(error);
    alert("Unable to connect to the backend.");
  }
};

  return (
    <><form
      onSubmit={handleSubmit}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6"
    >
      <div>
        <label className="block text-slate-300 mb-2">Age</label>

        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl p-4 text-white outline-none border border-slate-700 focus:border-cyan-400"
          placeholder="Enter your age" />
      </div>

      <div>
        <label className="block text-slate-300 mb-2">Gender</label>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl p-4 text-white border border-slate-700"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-slate-300 mb-2">Symptoms</label>

        <textarea
          rows="4"
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl p-4 text-white border border-slate-700"
          placeholder="Example: Fever, headache, cough..." />
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Duration
        </label>

        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl p-4 text-white border border-slate-700"
          placeholder="Example: 3 days" />
      </div>

      <div>
        <label className="block text-slate-300 mb-2">
          Existing Medical History
        </label>

        <textarea
          rows="3"
          name="history"
          value={form.history}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl p-4 text-white border border-slate-700"
          placeholder="Diabetes, BP, Asthma..." />
      </div>

      <button
        className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-4 text-white font-semibold"
      >
        Predict Disease
      </button>
    </form>
    <ResultCard result={result} />
    </>
  );
};

export default SymptomForm;