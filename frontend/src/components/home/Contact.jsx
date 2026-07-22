import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white">
            Contact Us
          </h2>

          <p className="text-slate-400 mt-4">
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-8">

            <div className="flex items-center gap-5">
              <Mail className="text-cyan-400" size={30} />
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-slate-400">
                  yourmail@example.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Phone className="text-green-400" size={30} />
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-slate-400">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <MapPin className="text-red-400" size={30} />
              <div>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-slate-400">
                  India
                </p>
              </div>
            </div>

          </div>

          {/* Right */}
          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-5"
          >

            <input
              placeholder="Full Name"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-500"
            />

            <input
              placeholder="Email Address"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-500"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-500"
            />

            <button
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-xl transition"
            >
              Send Message
            </button>

          </motion.form>

        </div>

      </div>
    </section>
  );
}