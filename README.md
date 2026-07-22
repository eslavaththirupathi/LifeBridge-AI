# 🏥 LifeBridge AI – Emergency Triage & Hospital Intelligence

LifeBridge AI is a fast, intelligent emergency assistant created to help people make life-saving medical decisions in critical moments. 

When a medical emergency happens, people often panic and don't know how severe the situation is, what first aid to give, or which nearby hospital to go to. LifeBridge AI solves this by analyzing symptoms, assigning a clear risk level, providing immediate first-aid advice, and recommending the right hospital.

🌐 **Live Working Demo:** [https://life-bridge-ai.vercel.app](https://life-bridge-ai.vercel.app)

---

## 💡 What LifeBridge AI Does

* 🩺 **Smart Symptom Analysis:** Users can type or speak their symptoms to get an instant evaluation.
* 🚦 **Clear Risk Levels:** Color-coded severity scores show if a situation is **Green (Low Risk)**, **Yellow (Medium Risk)**, or **Red (Critical)**.
* 🩹 **Step-by-Step First Aid:** Generates clear, easy-to-read first-aid instructions, including vital steps and what *not* to do.
* 🏥 **Hospital Guidance:** Recommends suitable nearby hospitals based on the required specialty and severity.
* 🎙️ **Voice Assistant:** Supports voice input so users can speak their symptoms naturally during high-stress situations.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** React, JavaScript, HTML5, CSS3 (Hosted on Vercel)
* **Backend:** Python, FastAPI (Hosted on Render)
* **Machine Learning & NLP:** Scikit-learn (Disease & Severity Models), Sentence Transformers / NLP, Web Speech API
* **Database:** PostgreSQL & structured JSON datasets
* **Deployment & Tools:** Vercel, Render, GitHub, Postman

---

## 📂 Project Structure

```text
LifeBridge-AI/
├── frontend/          # React web application
│   ├── src/           # Components, UI layouts, and logic
│   └── package.json   # Frontend dependencies
└── backend/           # FastAPI backend server
    ├── main.py        # API routes and models
    └── requirements.txt # Python dependencies
