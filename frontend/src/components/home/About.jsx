import { motion } from "framer-motion";
import { ShieldCheck, BrainCircuit, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="bg-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{opacity:0,y:60}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.7}}
          className="text-center mb-16"
        >

          <h2 className="text-5xl font-bold text-white">
            About LifeBridge AI
          </h2>

          <p className="mt-5 text-slate-400 max-w-3xl mx-auto text-lg leading-8">
            LifeBridge AI is an intelligent healthcare assistant that
            analyzes user symptoms using Machine Learning models to
            provide preliminary disease predictions, confidence scores,
            severity assessment and first-aid recommendations.
            It is designed to assist—not replace—professional medical
            consultation.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          <motion.div
            initial={{opacity:0,y:70}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:.1}}
            viewport={{once:true}}
            className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-cyan-500 transition"
          >
            <BrainCircuit className="text-cyan-400 mb-6" size={42}/>
            <h3 className="text-white text-2xl font-bold mb-4">
              AI Powered
            </h3>

            <p className="text-slate-400 leading-8">
              Uses Machine Learning algorithms trained on healthcare
              datasets to identify probable diseases based on symptoms.
            </p>
          </motion.div>

          <motion.div
            initial={{opacity:0,y:70}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:.25}}
            viewport={{once:true}}
            className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-green-500 transition"
          >
            <ShieldCheck className="text-green-400 mb-6" size={42}/>
            <h3 className="text-white text-2xl font-bold mb-4">
              Secure
            </h3>

            <p className="text-slate-400 leading-8">
              Personal information is not permanently stored.
              Predictions are generated securely for educational
              and healthcare assistance purposes.
            </p>
          </motion.div>

          <motion.div
            initial={{opacity:0,y:70}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:.4}}
            viewport={{once:true}}
            className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-red-500 transition"
          >
            <HeartHandshake className="text-red-400 mb-6" size={42}/>
            <h3 className="text-white text-2xl font-bold mb-4">
              Healthcare Support
            </h3>

            <p className="text-slate-400 leading-8">
              Provides first-aid guidance and precautionary advice
              until users consult qualified healthcare professionals.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}