import { useEffect, useState } from 'react';

type WebPlaybackProps = {
  token: string;
};

type PlayerProps = {
  togglePlay: () => Promise<void>;
};

const track = {
  name: '',
  album: {
    images: [{ url: '' }]
  },
  artists: [{ name: '' }]
};

export default function useWebPlayback({ token }: WebPlaybackProps) {
  const [player, setPlayer] = useState<PlayerProps | undefined>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [deviceId, setDeviceId] = useState(null);
  const [initialize, setInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    console.log(deviceId);
    document.head.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('passei');
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5
      });

      setPlayer(player);
      player.connect();

      player.getCurrentState().then((state) => {
        console.log(state);
      });

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        console.log({ player, state });
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });

      player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      player.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
      });
    };
  }, [token, initialize]);

  useEffect(() => {
    async function transferPlayback() {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: true
        })
      });
    }

    if (deviceId) {
      transferPlayback();
    } else {
      setInitialized(true);
    }
  }, [deviceId, token]);

  return {
    player
  };
}
