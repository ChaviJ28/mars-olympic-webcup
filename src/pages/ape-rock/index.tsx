import { motion, AnimatePresence } from "framer-motion";

import { ApeRock } from "@/components/ApeRock";

export default function PageApeRock() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ApeRock id={0} />
      </motion.div>
    </AnimatePresence>
  );
}
