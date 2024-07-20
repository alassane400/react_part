import React, { useEffect, useRef } from 'react';

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
