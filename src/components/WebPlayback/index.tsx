import { useCallback, useEffect, useState } from 'react';
import Player from '../Player';

type WebPlaybackProps = {
  token: string;
  playlist: string;
  isPause: boolean;
};

export default function WebPlayback({
  token,
  isPause,
  playlist
}: WebPlaybackProps) {
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(undefined);
  const [deviceId, setDeviceId] = useState(null);
  const [trackPosition, setTrackPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.head.appendChild(script);
  }, []);

  const skipToNext = useCallback(
    async function () {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          device_ids: [deviceId]
        })
      });
    },
    [deviceId, token]
  );

  const skipToPrevious = useCallback(
    async function () {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          device_ids: [deviceId]
        })
      });
    },
    [deviceId, token]
  );

  const setPlayback = useCallback(
    async function (deviceId: string, playlist: string) {
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlist}`,
          device_ids: [deviceId],
          offset: {
            position: 5
          },
          position_ms: 0
        })
      });
    },
    [token, playlist]
  );

  async function handleSeekToPosiotion(positionMs: number) {
    await fetch(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
  }

  const transferPlayback = useCallback(
    async function (deviceId: string) {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: false
        })
      });
    },
    [token]
  );

  useEffect(() => {
    //TODO: ADICIONAR ISSO NUM CONTEXTO
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5
      });

      if (spotifyPlayer && player === undefined) {
        setPlayer(spotifyPlayer);
        spotifyPlayer.connect();

        spotifyPlayer.addListener('ready', ({ device_id }) => {
          setDeviceId(device_id);
          if (!deviceId) transferPlayback(device_id);
          console.log('Ready with Device ID', device_id);
        });

        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        spotifyPlayer.addListener('progress', (state) => {
          setTrackPosition(state.position);
        });

        spotifyPlayer.on('playback_error', ({ message }) => {
          console.error('Failed to perform playback', message);
        });

        spotifyPlayer.on('initialization_error', ({ message }) => {
          console.error('Failed to initialize', message);
        });

        spotifyPlayer.on('authentication_error', ({ message }) => {
          console.error('Failed to authenticate', message);
        });

        spotifyPlayer.on('account_error', ({ message }) => {
          console.error('Failed to validate Spotify account', message);
        });

        spotifyPlayer.addListener('autoplay_failed', () => {
          console.log('Autoplay is not allowed by the browser autoplay rules');
        });
      }
    };
  }, [player]);

  useEffect(() => {
    if (deviceId) {
      console.log(playlist);
      setPlayback(deviceId, playlist);
    }
  }, [deviceId, playlist, setPlayback, token]);

  useEffect(() => {
    if (player) {
      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setIsLoading(false);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
    }
  }, [player]);

  useEffect(() => {
    if (isPause) {
      setPaused(true);
      player?.togglePlay();
    }
  }, [isPause, player]);

  return (
    <Player
      isLoading={isLoading}
      player={player}
      trackName={current_track?.name}
      duration={current_track?.duration_ms}
      currentTime={trackPosition}
      isPaused={is_paused}
      handleSeekToPosiotion={handleSeekToPosiotion}
      handleNextTrack={skipToNext}
      handlePrevTrack={skipToPrevious}
    />
  );
}
