import { motion } from 'framer-motion';

type ProgressProps = {
  currentIndex: number;
  length: number;
};

export default function Progress({ currentIndex, length }: ProgressProps) {
  const percentage = ((currentIndex + 1) / length) * 100;

  return (
    <>
      <section className="flex h-[1px] flex-1 items-center rounded-full bg-white bg-opacity-50">
        <div
          style={{
            width: percentage + '%'
          }}
          className={`h-[1px] rounded-full bg-yellow-400 bg-opacity-50`}
        />
      </section>
      <span className="overflow-hidden inline-block text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentIndex}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="flex items-center justify-center text-4xl font-medium"
        >
          {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex}`}
        </motion.div>
      </span>
    </>
  );
}
