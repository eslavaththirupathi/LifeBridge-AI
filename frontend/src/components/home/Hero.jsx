import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

{/* A more professional, custom designed heart with integrated pulse lines graphic. 
    This SVG renders a much smoother, sharper, and more cohesive image than the basic icon. */}
const ProfessionalHeartGraphic = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white filter drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
    >
      <path
        d="M256 461.2C247.9 461.2 240.2 458.1 234.3 452.4L78.1 306.9C31.5 260.6 31.5 186.2 78.1 139.9C102.1 116.1 133.7 103 167 103C198 103 227.1 114 249.2 134.1L256 140.3L262.8 134.1C284.9 114 314 103 345 103C378.3 103 409.9 116.1 433.9 139.9C480.5 186.2 480.5 260.6 433.9 306.9L277.7 452.4C271.8 458.1 264.1 461.2 256 461.2ZM167 131.7C141 131.7 116.3 141.9 97.5 160.5C61.3 196.4 61.3 254.4 97.5 290.3L256 438L414.5 290.3C450.7 254.4 450.7 196.4 414.5 160.5C395.7 141.9 371 131.7 345 131.7C321 131.7 298.5 140.4 281.3 156.1L256 179.3L230.7 156.1C213.5 140.4 191 131.7 167 131.7Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="12"
      />
      {/* Pulse line integration */}
      <path
        d="M136.1 270L174.5 270L198.8 231.2L228.3 323L260.7 217L285 270L323.4 270"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white opacity-95"
      />
    </svg>
  );
};

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-100 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            <HeartPulse size={16} className="text-red-500" />
            AI Powered Healthcare Assistant
          </span>

          <h1 className="text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
            Predict Diseases
            <br />
            using
            <span className="text-blue-600"> Artificial Intelligence</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            LifeBridge AI analyzes your symptoms using Machine Learning and
            provides preliminary disease predictions, confidence scores,
            severity assessment, and basic first-aid recommendations in
            seconds.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">

            <Link
              to="/diagnosis"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition duration-300"
            >
              Start Diagnosis
            </Link>

            <a
              href="#how-it-works"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
            >
              Learn More
            </a>

          </div>

        </div>

        {/* Right Content: Glowing Heart-Pulse Graphic (Updated for a Professional Look) */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative flex items-center justify-center p-4">
            {/* Outer Glow Effect */}
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] bg-blue-400/40 rounded-full blur-[70px] animate-pulse" />

            {/* Main Gradient Circle with the Professional Heart Graphic */}
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_15px_60px_-15px_rgba(37,99,235,0.6)] border-8 border-white/95">
              {/* Note: In modern Tailwind (v3.4+), you can use the class 'w-[36%]' for a more scalable sizing approach within the relative container, or use a prop size. Here we use prop sizes for clarity. */}
              <ProfessionalHeartGraphic size={120} />
              
              {/* Extra Subtle Inner Highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}