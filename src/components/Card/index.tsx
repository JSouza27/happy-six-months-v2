import Image from 'next/image';
import { motion } from 'framer-motion';

type CardProps = {
  imageSrc: string;
  title: string;
  selectedId: string;
  handleSelected: () => void;
};

export default function Card({
  imageSrc,
  title,
  selectedId,
  handleSelected
}: CardProps) {
  return (
    <li
      onClick={handleSelected}
      id="card-wrapper"
      className="list-none m-0 relative py-6 px-0 sm:p-6 flex-[1_0_100%] sm:flex-[0_0_40%] max-w-full sm:max-w-[40%] odd:pl-0 even:pr-0"
    >
      <section className="w-full border px-3 py-4 rounded-lg flex gap-4 flex-col bg-white h-[20rem] pointer-events-none">
        <motion.div
          id="card-content"
          className="pointer-events-auto relative overflow-hidden w-full h-full m-[0_auto]"
          layoutId={selectedId}
        >
          <section className="bg-slate-300 w-full relative flex items-center justify-center h-[90%]">
            {/* <Image
          src={imageSrc}
          alt="Imagem de pessoas"
          width={230}
          height={345}
        /> */}
          </section>
          <span className="text-lg text-center text-black">{title}</span>
        </motion.div>
      </section>
    </li>
  );
}
