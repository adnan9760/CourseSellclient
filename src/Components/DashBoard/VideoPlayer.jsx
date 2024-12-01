import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="my-6">
      <ReactPlayer url={videoUrl} controls={true} width="100%" height="100%" />
    </div>
  );
};

export default VideoPlayer;
