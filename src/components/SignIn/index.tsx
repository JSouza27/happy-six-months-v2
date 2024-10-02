import SpotfyLogo from '@/../public/img/spotify-icon.svg';
import Image from 'next/image';
import { handleLogin } from '../../actions/actions';

export default function SignIn() {
  return (
    <form action={handleLogin}>
      <button
        className="flex items-center justify-center gap-2 rounded-[32px] bg-[#1DB954] p-3 text-white text-xs font-semibold w-full max-w-fit"
        type="submit"
      >
        <Image
          src={SpotfyLogo}
          width={14}
          height={14}
          alt="Picture of the author"
        />
        <span>Login with spotify</span>
      </button>
    </form>
  );
}
