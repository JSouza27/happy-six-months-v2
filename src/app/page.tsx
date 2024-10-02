'use server';

import SignIn from '@/components/SignIn';

export type Data = {
  img: string;
  title: string;
  id: string;
  location: string;
  playlist: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default async function Login() {
  return (
    <div className="items-center bg-gray-900 flex flex-col justify-center h-full p-12 text-white w-full">
      <SignIn />
    </div>
  );
}
