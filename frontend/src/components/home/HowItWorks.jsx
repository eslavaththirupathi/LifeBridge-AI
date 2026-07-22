import { motion } from "framer-motion";
import {
  FaKeyboard,
  FaBrain,
  FaFirstAid,
  FaHospital,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaKeyboard className="text-cyan-400 text-4xl" />,
    title: "Enter Symptoms",
    description: "Provide age, gender, symptoms and medical history.",
  },
  {
    icon: <FaBrain className="text-purple-400 text-4xl" />,
    title: "AI Analysis",
    description: "Our AI predicts possible diseases and emergency severity.",
  },
  {
    icon: <FaFirstAid className="text-green-400 text-4xl" />,
    title: "First Aid",
    description: "Receive immediate first-aid guidance before reaching a hospital.",
  },
  {
    icon: <FaHospital className="text-red-400 text-4xl" />,
    title: "Nearest Hospital",
    description: "Locate the best nearby hospital for emergency treatment.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Get emergency assistance in just four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 h-full hover:border-cyan-500 transition">

                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                  {step.icon}
                </div>

                <h3 className="text-white text-2xl font-bold mb-4">
                  {step.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {step.description}
                </p>

                <div className="absolute -top-5 -left-5 bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;