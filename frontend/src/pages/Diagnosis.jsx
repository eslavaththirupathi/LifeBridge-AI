import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Stethoscope,
  User,
  Calendar,
  ClipboardList,
  Activity,
  Loader2,
} from "lucide-react";

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

      setError(err.message || "Failed to fetch response from backend.");

    } finally {

      setLoading(false);

    }

  };

  const getSeverityColor = () => {

    if (!result) return "bg-cyan-500";

    if (result.severity === "High")
      return "bg-red-500";

    if (result.severity === "Moderate" || result.severity === "Medium")
      return "bg-yellow-500";

    return "bg-green-500";
  };

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

<nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">

<div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

<Link
to="/"
className="flex items-center gap-3"
>

<div className="bg-cyan-500 rounded-xl p-2">

<Stethoscope
className="text-white"
size={24}
/>

</div>

<div>

<h1 className="text-white text-xl font-bold">
LifeBridge AI
</h1>

<p className="text-slate-400 text-sm">
AI Healthcare Assistant
</p>

</div>

</Link>

<Link
to="/"
className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl font-semibold transition"
>

<ArrowLeft size={18}/>

Home

</Link>

</div>

</nav>

<section className="max-w-7xl mx-auto px-6 py-16">

<motion.div

initial={{opacity:0,y:50}}

animate={{opacity:1,y:0}}

transition={{duration:.6}}

className="text-center mb-14"
>

<h1 className="text-5xl font-bold text-white">

AI Disease Diagnosis

</h1>
<p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">

Enter your symptoms and receive an AI-powered preliminary disease prediction, confidence score, severity level and first-aid recommendation.

</p>

</motion.div>

<div className="grid lg:grid-cols-2 gap-10">

<motion.div

initial={{opacity:0,x:-60}}

animate={{opacity:1,x:0}}

transition={{duration:.6}}

className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800 p-8"
>

<form onSubmit={handleSubmit}>

<label className="text-white font-semibold mb-2 block">
Age
</label>

<div className="relative mb-6">

<User
size={18}
className="absolute left-4 top-4 text-cyan-400"
/>

<input

type="number"

name="age"

value={formData.age}

onChange={handleChange}

className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none"

required

/>
</div>
<label className="text-white font-semibold mb-2 block">
Gender
</label>
<select

name="gender"

value={formData.gender}

onChange={handleChange}

className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white mb-6"

>

<option>Male</option>

<option>Female</option>

<option>Other</option>

</select>
<label className="text-white font-semibold mb-2 block">
Symptoms
</label>

<div className="relative mb-6">
<Activity
size={18}
className="absolute left-4 top-4 text-cyan-400"
/>
<textarea

rows="5"

name="symptoms"

value={formData.symptoms}

onChange={handleChange}

placeholder="Example: fever, cough, headache"

className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white resize-none focus:border-cyan-500 outline-none"

required

/>

</div>

<label className="text-white font-semibold mb-2 block">
Duration
</label>

<div className="relative mb-6">

<Calendar
size={18}
className="absolute left-4 top-4 text-cyan-400"
/>

<input

name="duration"

value={formData.duration}

onChange={handleChange}

className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white"

/>

</div>

<label className="text-white font-semibold mb-2 block">
Medical History
</label>

<div className="relative mb-8">

<ClipboardList
size={18}
className="absolute left-4 top-4 text-cyan-400"
/>

<textarea

rows="3"

name="history"

value={formData.history}

onChange={handleChange}

className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white"

/>

</div>

<button

disabled={loading}

className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-xl transition flex justify-center items-center gap-3"

>

{loading ? (

<>

<Loader2 className="animate-spin"/>

Analyzing Symptoms...

</>

) : (

"Analyze with AI"

)}

</button>

</form>

</motion.div>

{/* RIGHT SIDE */}

<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>

{loading ? (

<div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800 p-12 text-center h-full flex flex-col justify-center">

<Loader2
size={70}
className="animate-spin text-cyan-400 mx-auto mb-8"
/>

<h2 className="text-white text-3xl font-bold">

Analyzing Symptoms...

</h2>

<p className="text-slate-400 mt-5 leading-8">

Our AI model is processing your symptoms and generating the most probable prediction.

</p>

</div>

) : error ? (

<div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-red-800/50 p-12 text-center h-full flex flex-col justify-center">

<div className="mx-auto bg-red-500/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">

<Activity
size={40}
className="text-red-400"
/>

</div>

<h2 className="text-white text-2xl font-bold mb-3">

Connection Error

</h2>

<p className="text-red-300 leading-7">

{error}

</p>

<button
onClick={() => setError("")}
className="mt-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition self-center"
>

Try Again

</button>

</div>

) : result ? (

<div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800 p-8">

<h2 className="text-white text-3xl font-bold mb-8">

Diagnosis Report

</h2>

<div className="space-y-6">

<div>

<p className="text-slate-400">

Predicted Disease

</p>

<h3 className="text-cyan-400 text-3xl font-bold">

{result.disease}

</h3>

</div>

<div>

<div className="flex justify-between mb-2">

<span className="text-slate-300">
Confidence
</span>

<span className="text-white font-semibold">
{result.confidence}%
</span>

</div>

<div className="w-full bg-slate-700 rounded-full h-4">

<div
className="bg-cyan-500 h-4 rounded-full transition-all duration-1000"
style={{
width: `${result.confidence}%`,
}}
></div>

</div>

</div>

<div>

<p className="text-slate-400 mb-3">

Severity

</p>

<span
className={`${getSeverityColor()} px-5 py-2 rounded-full text-white font-semibold`}
>

{result.severity}

</span>

</div>

{result.description && (

<div className="bg-slate-950 rounded-xl p-6 border border-slate-800">

<h3 className="text-cyan-400 font-bold mb-3">

AI Analysis

</h3>

<p className="text-slate-300 leading-8">

{result.description}

</p>

</div>

)}

{result.firstAid && (

<div className="bg-green-950/40 border border-green-700 rounded-xl p-6">

<h3 className="text-green-400 font-bold mb-3">

First Aid Recommendation

</h3>

<p className="text-slate-300 leading-8">

{result.firstAid}

</p>

</div>

)}

{result.precautions && (

<div>

<h3 className="text-white font-bold mb-4">

Precautions

</h3>

<div className="flex flex-wrap gap-3">

{result.precautions.map((item,index)=>(

<div
key={index}
className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-slate-200"
>

{item}

</div>

))}

</div>

</div>

)}

<div className="border-t border-slate-700 pt-6">

<p className="text-yellow-400 text-sm leading-7">

⚠ This prediction is generated by a Machine Learning model and is intended only for educational purposes. It should not be considered a medical diagnosis. Please consult a qualified healthcare professional for proper medical evaluation and treatment.

</p>

</div>

<button

onClick={()=>{
setResult(null);
setError("");

setFormData({
age:25,
gender:"Male",
symptoms:"",
duration:"1 day",
history:"None"
});
}}

className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-xl transition"

>

Start New Diagnosis

</button>

</div>

</div>

) : (

<div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800 p-12 text-center h-full flex flex-col justify-center">

<div className="mx-auto bg-cyan-500/20 w-24 h-24 rounded-full flex items-center justify-center mb-8">

<Activity
size={45}
className="text-cyan-400"
/>

</div>

<h2 className="text-white text-3xl font-bold">

AI Ready

</h2>

<p className="text-slate-400 mt-6 leading-8">

Fill in your symptoms on the left and click <strong>Analyze with AI</strong> to receive a disease prediction, confidence score, severity level, and first-aid recommendation.

</p>

</div>

)}

</motion.div>

</div>

</section>

</div>

);

}