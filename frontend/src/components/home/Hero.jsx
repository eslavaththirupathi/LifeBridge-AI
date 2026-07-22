import { motion } from "framer-motion";
import { FaArrowRight, FaHeartbeat } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
            <FaHeartbeat className="text-red-500" />
            <span className="text-cyan-300 text-sm">
              AI Powered Emergency Healthcare
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
            Save Lives
            <span className="text-cyan-400"> Faster </span>
            with AI
          </h1>

          <p className="text-slate-400 text-lg mt-8 max-w-xl leading-8">
            LifeBridge AI helps users identify possible medical emergencies,
            receive AI-powered first aid guidance, and locate the nearest
            suitable hospital within seconds.
          </p>

          <div className="flex gap-5 mt-10 flex-wrap">

            <button className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-2">
              Start Diagnosis
              <FaArrowRight />
            </button>

            <button className="border border-slate-700 hover:border-cyan-400 transition px-8 py-4 rounded-xl text-white">
              Learn More
            </button>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <FaHeartbeat className="text-white text-9xl" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;