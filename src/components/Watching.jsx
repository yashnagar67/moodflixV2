import React, { useState, useRef, useEffect } from 'react';

const LocalVideoPlayer = ({ onClose }) => {
  // Video State Management
  const [videoFile, setVideoFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // File Selection Handler
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(URL.createObjectURL(file));
    } else {
      alert('Please select a valid video file');
    }
  };

  // Video Control Functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    const manualChange = Number(e.target.value);
    setProgress(manualChange);
    if (videoRef.current) {
      const time = (manualChange / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // Video Event Handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent = 
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* File Input */}
      {!videoFile && (
        <div className="flex-grow flex flex-col items-center justify-center">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="video/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
          >
            Select Local Video
          </button>
          <p className="text-gray-400 mt-4">Supported formats: MP4, AVI, MKV, MOV</p>
        </div>
      )}

      {/* Video Container */}
      {videoFile && (
        <div className="relative flex-grow">
          <video
            ref={videoRef}
            src={videoFile}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="flex space-x-4 items-center">
                {/* Play/Pause */}
                <button 
                  onClick={togglePlay} 
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <span className="text-white">Volume</span>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Fullscreen Toggle */}
                <button 
                  onClick={toggleFullScreen}
                  className="text-white bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {videoFile && (
        <div className="w-full h-1 bg-gray-700">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 appearance-none bg-transparent"
          />
        </div>
      )}

      {/* Bottom Controls */}
      {videoFile && (
        <div className="bg-black bg-opacity-80 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-white">Local Video</span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setVideoFile(null);
                setProgress(0);
                setIsPlaying(false);
              }}
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              Select New Video
            </button>
            <button 
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              Close Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalVideoPlayer;