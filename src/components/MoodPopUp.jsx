import React from 'react';

const MoodPopup = ({ onMoodSelect }) => {
  const moods = ["Happy", "Relaxed", "Sad", "Romantic", "Bored", "Focus"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">What's Your Mood Today?</h2>
        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodSelect(mood)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodPopup;
