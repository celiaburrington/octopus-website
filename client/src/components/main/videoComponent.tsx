import React, { useEffect, useRef } from 'react';

/**
 * A VideoComponent that automatically plays a video from a given source location.
 * Video is played on a loop.
 */
const VideoComponent = ({ className = '', source }: { className?: string; source: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);

  return (
    <video className={className} ref={videoRef} loop muted>
      <source src={source} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;
