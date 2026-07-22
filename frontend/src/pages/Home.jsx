import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";

const Home = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default Home;