import { Link } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { motion } from "motion/react";
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="px-10 md:px-20 py-20 bg-slate-50 min-h-lvh flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold md:font-medium text-center">
        Welcome to Noter
      </h1>
      <p className="md:text-xl mt-2 text-gray-500 text-center">
        Your one-stop note-taking app
      </p>
      <Link to="/register">
        <motion.button
          whileHover={{ scale: 1.1, cursor: "pointer" }}
          className="mt-3 bg-black py-2 px-4 rounded text-white flex flex-row items-center gap-1"
        >
          Get Started
          <CiLocationArrow1 />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Home;
