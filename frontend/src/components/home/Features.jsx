import { motion } from "framer-motion";
import {
  FaRobot,
  FaHospital,
  FaMicrophone,
  FaAmbulance,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-cyan-400 text-5xl" />,
    title: "AI Diagnosis",
    description:
      "Analyze symptoms using AI to identify possible diseases and emergency severity.",
  },
  {
    icon: <FaHospital className="text-emerald-400 text-5xl" />,
    title: "Hospital Finder",
    description:
      "Find the nearest suitable hospital with available emergency facilities.",
  },
  {
    icon: <FaMicrophone className="text-yellow-400 text-5xl" />,
    title: "Voice Assistant",
    description:
      "Describe symptoms by voice and let AI process them instantly.",
  },
  {
    icon: <FaAmbulance className="text-red-500 text-5xl" />,
    title: "Emergency SOS",
    description:
      "Quickly alert family members and emergency responders during critical situations.",
  },
];

const Features = () => {
  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Everything you need during a medical emergency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-cyan-500 shadow-lg"
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="text-white text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;