'use client';

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <main className="items-center bg-gradient-to-b from-[#FFE4DC] to-[#FFA8A6] flex flex-col justify-center h-full p-4 text-white w-full">
      {children}
    </main>
  );
}
