import React, { useState } from 'react';
import jumpscareSound from '../assets/jumpscare.mp3'; // Ensure you have the audio file in the correct location
import jumpscareImage from '../assets/jumpscare.png'; // Ensure you have the image file in the correct location

const Robots = () => {
  const [showJumpscare, setShowJumpscare] = useState(false);

  const handleButtonClick = () => {
    playJumpscareSound();
    // Add a small delay before showing the image to sync with the sound
    setTimeout(() => {
      setShowJumpscare(true);
    }, 500); // Delay by 500ms to allow sound to start before showing image
  };

  const playJumpscareSound = () => {
    const audio = new Audio(jumpscareSound);
    audio.play().catch((error) => {
      console.error("Sound failed to play:", error);
    });
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', height: '100vh' }}>
      {/* Button to trigger the jumpscare */}
      {!showJumpscare && (
        <button
          onClick={handleButtonClick}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            marginTop: '20vh'
          }}
        >
          Click here to display flag
        </button>
      )}

      {/* Jumpscare image */}
      {showJumpscare && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={jumpscareImage}
            alt="Jumpscare"
            style={{
              width: 'auto',
              height: '80%',
              zIndex: 10,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Robots;
