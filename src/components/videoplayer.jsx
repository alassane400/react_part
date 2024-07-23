import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    if (user.videoTrack && ref.current) {
      user.videoTrack.play(ref.current);
    }
  }, [user]);

  return (
    <div style={{borderColor:"orange",margin:"10px"}}>
      Uid: {user.uid}
      <div
        ref={ref}
        style={{ width: '200px', height: '200px', backgroundColor: '#000',borderColor:"orange",margin:"10px" }}
      ></div>
    </div>
  );
};
