import Navbar from "../components/layout/Navbar";
import SymptomForm from "../components/diagnosis/SymptomForm";

const Diagnosis = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold text-white mb-4">
            AI Symptom Diagnosis
          </h1>

          <p className="text-slate-400 mb-10">
            Enter your symptoms and let LifeBridge AI analyze your condition.
          </p>

          <SymptomForm />

        </div>
      </div>
    </div>
  );
};

export default Diagnosis;