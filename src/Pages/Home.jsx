import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="px-10 md:px-20 py-20 bg-slate-50 min-h-lvh flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold md:font-medium text-center">
        Welcome to Noter
      </h1>
      <p className="md:text-xl mt-2 text-gray-500 text-center">
        Your one-stop note-taking app
      </p>
      <Link to="/register">
        <button className="mt-3 bg-black py-2 px-4 rounded text-white flex flex-row items-center gap-1">
          Get Started
          <CiLocationArrow1 />
        </button>
      </Link>
    </div>
  );
};

export default Home;
