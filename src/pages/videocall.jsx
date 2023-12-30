import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './video.css';
const socket = io('http://localhost:3001');
function VideoCall() {
  const videoRef = useRef();

  useEffect(() => {
    const setupMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
        socket.emit('stream', stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupMediaStream();
  }, []);

  return (
    <div>
      <div className='video-container'>
      <video className='video' ref={videoRef} />
     
      </div>
    </div>
  );
}

export default VideoCall;
