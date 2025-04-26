import { useState } from "react";
import MoodSelector from "../components/MoodSelection";

const Recommended = (movieData) => {
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(true); // Default open
  console.log("from recommended",movieData['0'])

  return (
    <div>
      <MoodSelector 
       
      />
    </div>
  );
};

export default Recommended;
