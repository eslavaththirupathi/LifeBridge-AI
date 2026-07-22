import { motion } from "framer-motion";
import { Activity, Brain, HeartPulse, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: <Brain size={38} className="text-cyan-400" />,
    value: "1,326",
    suffix: "+",
    label: "Symptoms Analysed",
  },
  {
    icon: <Activity size={38} className="text-green-400" />,
    value: "95",
    suffix: "%",
    label: "Prediction Accuracy",
  },
  {
    icon: <HeartPulse size={38} className="text-red-400" />,
    value: "24",
    suffix: "/7",
    label: "Healthcare Support",
  },
  {
    icon: <ShieldCheck size={38} className="text-purple-400" />,
    value: "100",
    suffix: "%",
    label: "Secure Analysis",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white">
            Trusted AI Healthcare
          </h2>
          <p className="text-slate-400 mt-4">
            Fast. Secure. Intelligent disease prediction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center hover:border-cyan-500 transition"
            >
              <div className="flex justify-center mb-6">{item.icon}</div>

              <h1 className="text-5xl font-bold text-white">
                {item.value}
                {item.suffix}
              </h1>

              <p className="mt-4 text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}