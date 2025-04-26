import React from 'react';

const YouTubePlayer = ({ url, isMuted, isMobile }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full" style={isMobile ? { overflow: 'hidden', transform: 'translateZ(0)', willChange: 'transform' } : {}}>
        <iframe
          src={`${url}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&vq=hd720&enablejsapi=1`}
          className={`absolute w-full h-full object-cover ${isMobile ? 'scale-[2.5] origin-center' : ''}`}
          title="Movie trailer"
          loading="lazy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Overlay to hide YouTube elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-l from-black to-transparent"></div>
      </div>
    </div>
  );
};

export default React.memo(YouTubePlayer);