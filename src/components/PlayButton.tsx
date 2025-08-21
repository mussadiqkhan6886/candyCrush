import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PlayButton = () => {
  return (
    <div className="flex min-h-[200px] items-center justify-center px-4">
      <RainbowBorderButton />
    </div>
  );
};

const RainbowBorderButton = () => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="relative z-10 w-full max-w-xs rounded-xl  px-6 py-3 text-lg font-bold text-white shadow-lg
                 before:absolute before:-inset-[4px] before:rounded-xl before:bg-[linear-gradient(270deg,#ff4ecd,#ffcc33,#33ccff,#66ff99,#ff6699,#ff4ecd)]
                 before:bg-[length:400%_400%] before:animate-[rainbowMove_8s_linear_infinite] before:-z-10
                 after:absolute after:inset-0 after:rounded-xl after:bg-red-600 after:-z-10"
    >
      <Link to="/game" className="relative z-10">
        Play Game
      </Link>
    </motion.button>
  );
};

export default PlayButton;
