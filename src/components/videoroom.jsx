import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './videoplayer';

const APP_ID = '28a1911ae25f49c18d7b39bb4a495468';
const TOKEN = '007eJxTYDj4hfvCKrOHUR7W7L+79Mq3KZ8w2d8iktt8Xyry25yNOvsUGIwsEg0tDQ0TU41M00wskw0tUsyTjC2TkkwSTSxNTcwsemqnpjUEMjJYJjIxMEIhiM/J4JyfW5CYl5mfx8AAAOuRIJk=';
const CHANNEL = 'Companion';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const joinChannel = async () => {
      client.on('user-published', handleUserJoined);
      client.on('user-unpublished', handleUserUnpublished);
      client.on('user-left', handleUserLeft);

      try {
        const uid = Math.floor(Math.random() * 1000000);
        await client.join(APP_ID, CHANNEL, TOKEN, uid);

        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([audioTrack, videoTrack]);

        await client.publish([audioTrack, videoTrack]);

        setUsers((prevUsers) => [
          ...prevUsers,
          { uid, videoTrack, audioTrack },
        ]);

        setJoined(true);
      } catch (error) {
        console.error('Failed to join channel:', error);
      }
    };

    joinChannel();

    return () => {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
      client.unpublish(localTracks).then(() => client.leave());
      client.off('user-published', handleUserJoined);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((prevUsers) => [...prevUsers, user]);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  const handleUserUnpublished = (user, mediaType) => {
    if (mediaType === 'video') {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    }

    if (mediaType === 'audio') {
      user.audioTrack.stop();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
