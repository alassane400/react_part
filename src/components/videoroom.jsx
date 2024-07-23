import React, { useEffect, useState, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = '28a1911ae25f49c18d7b39bb4a495468';
const CHANNEL = 'Companion'; // Vous pouvez rendre ce canal dynamique si nécessaire

const fetchToken = async (channelName, uid) => {
  const response = await fetch(`http://localhost:3001/rtc-token?channelName=${channelName}&uid=${uid}`);
  const data = await response.json();
  return data.token;
};

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [joined, setJoined] = useState(false);
  const client = useRef(null);

  useEffect(() => {
    const joinChannel = async () => {
      client.current = AgoraRTC.createClient({
        mode: 'rtc',
        codec: 'vp8',
      });

      client.current.on('user-published', handleUserJoined);
      client.current.on('user-unpublished', handleUserUnpublished);
      client.current.on('user-left', handleUserLeft);

      try {
        const uid = Math.floor(Math.random() * 1000000);
        const token = await fetchToken(CHANNEL, uid);

        await client.current.join(APP_ID, CHANNEL, token, uid);

        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([audioTrack, videoTrack]);

        await client.current.publish([audioTrack, videoTrack]);

        setUsers((prevUsers) => [
          ...prevUsers,
          { uid, videoTrack, audioTrack },
        ]);

        setJoined(true);

        // Log the participation link
        const participationLink = `https://your-meeting-platform.com/join?channel=${CHANNEL}&uid=${uid}`;
        console.log("Join the meeting using this link: ", participationLink);

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
      if (client.current) {
        client.current.unpublish(localTracks).then(() => client.current.leave());
        client.current.off('user-published', handleUserJoined);
        client.current.off('user-unpublished', handleUserUnpublished);
        client.current.off('user-left', handleUserLeft);
      }
    };
  }, [localTracks]);

  const handleUserJoined = async (user, mediaType) => {
    await client.current.subscribe(user, mediaType);

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

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    if (user.videoTrack && ref.current) {
      user.videoTrack.play(ref.current);
    }
  }, [user]);

  return (
    <div>
      Uid: {user.uid}
      <div
        ref={ref}
        style={{ width: '200px', height: '200px', backgroundColor: '#000' }}
      ></div>
    </div>
  );
};
