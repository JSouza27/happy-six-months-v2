import axios from 'axios';

export default function Login() {
  const scope =
    'streaming \
    user-read-email \
    user-read-private';

  const loginWithSpotify = async () => {
    const spotify_client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const spotify_client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        params: {
          grant_type: 'authorization_code',
          scope: scope
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              spotify_client_id + ':' + spotify_client_secret
            ).toString('base64')
        }
      }
    );
  };

  return (
    <div>
      <button type="button" onClick={loginWithSpotify}>
        Login with Spotify
      </button>
    </div>
  );
}
