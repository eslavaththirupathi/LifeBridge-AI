import { FaHeartbeat } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <FaHeartbeat className="text-red-500 text-3xl" />
          <h1 className="text-white text-2xl font-bold">
            LifeBridge AI
          </h1>
        </div>

        <ul className="hidden md:flex gap-8 text-slate-300 font-medium">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">Features</li>
          <li className="hover:text-cyan-400 cursor-pointer">How it Works</li>
          <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
        </ul>

        <Link to="/diagnosis">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl transition">
            Start Diagnosis
        </button>
        </Link>

      </div>
    </motion.nav>
  );
};

export default Navbar;