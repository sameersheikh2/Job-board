import { motion } from "motion/react";
import { cn } from "../../../lib/utils";

const basePanel =
  "min-h-[40vh] w-full rounded-3xl border border-[#d8cab8] bg-white/85 shadow-xl backdrop-blur";

const AuthLayout = ({ sideContent, children }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6f5f3] via-white to-[#efede8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          className={cn(
            basePanel,
            "relative overflow-hidden bg-[#0f172a] text-white shadow-2xl",
          )}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#33415540,transparent_45%),radial-gradient(circle_at_80%_20%,#22c55e30,transparent_40%),radial-gradient(circle_at_50%_80%,#6366f130,transparent_35%)]" />
          <div className="relative flex h-full flex-col justify-between p-10">
            {sideContent}
          </div>
        </motion.div>

        <motion.div
          className={cn(basePanel, "p-6 sm:p-8")}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
