'use client';

import { useSession } from 'next-auth/react';
import Main from '@/components/Main';
import PhotoCarousel from '@/components/PhotoCarousel';
import WebPlayback from '@/components/WebPlayback';
import { formatDifference } from '@/utils/formatDifference';
import photo1 from '../../../public/assets/CYMERA_20240430_085502.jpg';
import photo2 from '../../../public/assets/CYMERA_20240430_085520.jpg';
import photo3 from '../../../public/assets/CYMERA_20240430_085600.jpg';
import photo4 from '../../../public/assets/CYMERA_20240527_184743~2.jpg';
import photo5 from '../../../public/assets/IMG-20240415-WA0008.jpg';
import photo6 from '../../../public/assets/IMG-20240511-WA0004.jpg';
import photo7 from '../../../public/assets/IMG-20240529-WA0009.jpg';
import photo8 from '../../../public/assets/IMG-20240602-WA0008.jpg';
import photo9 from '../../../public/assets/IMG-20240914-WA0058.jpg';
import photo10 from '../../../public/assets/IMG_20240517_163349.jpg';

export default function Home() {
  const { data: session } = useSession();
  const images = [
    photo1.src,
    photo2.src,
    photo3.src,
    photo4.src,
    photo5.src,
    photo6.src,
    photo7.src,
    photo8.src,
    photo9.src,
    photo10.src
  ];

  return (
    <Main>
      <PhotoCarousel images={images} />
      <div className="flex flex-col gap-1 items-center text-[#43525B] mb-40">
        <span>Juntos</span>
        <span>{formatDifference(new Date(2024, 3, 30))}</span>
        {/* <span>❤️</span> */}
        <img className="w-10" src="/img/heart.svg" alt="imagem de um coração" />
      </div>
      {session?.user.accessToken && (
        <WebPlayback
          playlist={'6JlzOScDgpNGncze1HQccf'}
          token={session?.user.accessToken}
          isPause
        />
      )}
    </Main>
  );
}
