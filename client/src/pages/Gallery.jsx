import React, { useEffect, useState } from 'react';
import ArtCard from '../components/ArtCard';
import { CircularProgress, Fade } from '@mui/material'; // Import the required Material-UI components
import OptionsDrawer from '../components/OptionsDrawer';
import { paintings } from '../../public/paintings'; // Import paintings from the paintings.js file

const Gallery = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Directly use the imported paintings data instead of fetching
    setArtPieces(paintings);
    setLoading(false); // Turn off loading as we have the data already
  }, []);

  return (
    <>
      <OptionsDrawer/>
      {/* Display loading spinner if still loading */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Fade in={!loading} timeout={1000}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px'
          }}>
            {artPieces.map((piece, index) => (
              <div key={index} style={{ margin: '15px' }}>
                <ArtCard
                  image={piece.image}
                  artist={piece.artist}
                  year={piece.year}
                  value={piece.value}
                />
              </div>
            ))}
          </div>
        </Fade>
      )}
    </>
  );
}

export default Gallery;
