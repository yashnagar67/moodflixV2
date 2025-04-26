import React from 'react';

const MovieControls = ({ isMuted, toggleMute, isTrailerPlaying, isGifPlaying }) => {
  return (
    <>
      {/* Volume control */}
      {(isTrailerPlaying || isGifPlaying) && (
        <button
          className="absolute bottom-16 md:bottom-24 right-4 md:right-8 bg-black/60 hover:bg-black/80 p-2 md:p-3 rounded-full z-30"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute(e);
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zm13.517-7.921A4.998 4.998 0 0123 12c0 2.21-1.43 4.078-3.414 4.733a.5.5 0 01-.173-.968A4.002 4.002 0 0022 12a4 4 0 00-2.929-3.852.5.5 0 01.335-.969zm-3.816 1.98A1.5 1.5 0 0117 12a1.5 1.5 0 01-1 1.415v-3.37a1.5 1.5 0 01.59.014z" />
            </svg>
          )}
        </button>
      )}
    </>
  );
};

export default React.memo(MovieControls);