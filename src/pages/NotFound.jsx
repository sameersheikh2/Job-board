import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/lost.gif" alt="Lost" className="mx-auto mb-6 h-64 w-64" />
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Oops! Are you lost?
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
