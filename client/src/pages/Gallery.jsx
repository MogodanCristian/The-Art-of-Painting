import React, { useEffect, useState } from 'react';
import ArtCard from '../components/ArtCard';
import GalleryDrawer from '../components/GalleryDrawer';
import { CircularProgress, Fade } from '@mui/material'; // Import the required Material-UI components

const Gallery = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/paintings.json')
      .then(response => response.json())
      .then(data => {
        setArtPieces(data);
        setLoading(false); // Turn off loading after the data is fetched
      })
      .catch(error => {
        console.error('Error fetching art pieces:', error);
        setLoading(false); // Turn off loading in case of error
      });
  }, []);

  return (
    <>
      <GalleryDrawer />
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
