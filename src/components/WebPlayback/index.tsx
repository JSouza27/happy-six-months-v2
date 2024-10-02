import { useCallback, useEffect, useState } from 'react';
import Player from '../Player';

type WebPlaybackProps = {
  token: string;
  playlist: string;
  isPause: boolean;
};

type StateType = {
  uri: string;
  metadata: unknown;
  disallows: {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  };
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: {
    current_track: {
      name: string;
      duration_ms: number;
    };
  };
};

export default function WebPlayback({
  token,
  isPause,
  playlist
}: WebPlaybackProps) {
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [current_track, setTrack] = useState<{
    name: string;
    duration_ms: number;
  }>();
  const [deviceId, setDeviceId] = useState('');
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
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5
      });

      if (spotifyPlayer && player === undefined) {
        setPlayer(spotifyPlayer);
        spotifyPlayer.connect();

        spotifyPlayer.addListener(
          'ready',
          ({ device_id }: { device_id: string }) => {
            setDeviceId(device_id);
            if (!deviceId) transferPlayback(device_id);
            console.log('Ready with Device ID', device_id);
          }
        );

        spotifyPlayer.addListener(
          'not_ready',
          ({ device_id }: { device_id: string }) => {
            console.log('Device ID has gone offline', device_id);
          }
        );

        spotifyPlayer.addListener('progress', (state: StateType) => {
          setTrackPosition(state.position);
        });

        spotifyPlayer.on(
          'playback_error',
          ({ message }: { message: string }) => {
            console.error('Failed to perform playback', message);
          }
        );

        spotifyPlayer.on(
          'initialization_error',
          ({ message }: { message: string }) => {
            console.error('Failed to initialize', message);
          }
        );

        spotifyPlayer.on(
          'authentication_error',
          ({ message }: { message: string }) => {
            console.error('Failed to authenticate', message);
          }
        );

        spotifyPlayer.on(
          'account_error',
          ({ message }: { message: string }) => {
            console.error('Failed to validate Spotify account', message);
          }
        );

        spotifyPlayer.addListener('autoplay_failed', () => {
          console.log('Autoplay is not allowed by the browser autoplay rules');
        });
      }
    };
  }, [player]);

  useEffect(() => {
    if (deviceId) {
      setPlayback(deviceId, playlist);
    }
  }, [deviceId, playlist, setPlayback, token]);

  useEffect(() => {
    if (player) {
      player.addListener('player_state_changed', (state: StateType) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setIsLoading(false);
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
      trackName={current_track?.name || ''}
      duration={current_track?.duration_ms || 0}
      currentTime={trackPosition}
      isPaused={is_paused}
      handleSeekToPosiotion={handleSeekToPosiotion}
      handleNextTrack={skipToNext}
      handlePrevTrack={skipToPrevious}
    />
  );
}
