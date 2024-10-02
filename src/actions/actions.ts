'use server';
import { signIn } from '@/utils/auth';

export async function handleLogin() {
  await signIn('spotify', { redirectTo: '/home' });
}
