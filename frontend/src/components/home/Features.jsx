import {
  Brain,
  Activity,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={42} className="text-blue-600" />,
    title: "AI Disease Prediction",
    description:
      "Machine Learning analyzes symptoms to predict the most probable disease quickly and accurately.",
  },
  {
    icon: <Activity size={42} className="text-green-600" />,
    title: "Instant Analysis",
    description:
      "Receive predictions, confidence scores, severity levels, and recommendations within seconds.",
  },
  {
    icon: <ShieldCheck size={42} className="text-purple-600" />,
    title: "Secure & Private",
    description:
      "No personal medical records are stored. Your symptom analysis remains private.",
  },
  {
    icon: <HeartPulse size={42} className="text-red-500" />,
    title: "First Aid Guidance",
    description:
      "Get immediate first-aid suggestions and precautions while seeking professional medical advice.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose LifeBridge AI?
          </h2>

          <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
            Combining Artificial Intelligence with healthcare to provide
            quick, intelligent, and reliable preliminary disease predictions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border border-slate-200 hover:-translate-y-2"
            >
              <div className="mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}