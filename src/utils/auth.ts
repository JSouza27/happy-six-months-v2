import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '@/constants/spotify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token?.accessToken || '');
    spotifyApi.setRefreshToken(token?.refreshToken || '');

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken
    };
  } catch (error) {
    console.error('Error refreshing access token', error);

    return {
      ...token,
      error: 'RefreshAccesssTokenError'
    };
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  basePath: process.env.NEXTAUTH_URL,
  pages: {
    signIn: '/',
    verifyRequest: '/'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account?.expires_at && account?.expires_at * 1000
        };
      }

      const currentDate = new Date();
      if (token?.exp && new Date(token?.exp * 1000) < currentDate) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    }
  }
});

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError' | undefined | unknown;
    user: {
      accessToken: string;
      refreshToken: string;
    };
  }
}
