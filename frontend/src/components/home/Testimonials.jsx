import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Healthcare Student",
    role: "Medical Education",
    review:
      "LifeBridge AI provides quick symptom analysis with a clean interface. It is an excellent educational healthcare assistant.",
  },
  {
    name: "Project Evaluator",
    role: "Academic Review",
    review:
      "The application combines Machine Learning, FastAPI and React into a professional full-stack healthcare solution.",
  },
  {
    name: "AI Enthusiast",
    role: "Technology",
    review:
      "The user interface is modern, responsive and provides clear disease prediction with confidence scores and first-aid guidance.",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            What People Say
          </h2>

          <p className="text-slate-400 mt-4">
            Feedback about LifeBridge AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition"
            >
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-300 leading-8 italic">
                "{review.review}"
              </p>

              <div className="mt-8">
                <h4 className="text-white font-bold">
                  {review.name}
                </h4>

                <p className="text-cyan-400 text-sm">
                  {review.role}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}