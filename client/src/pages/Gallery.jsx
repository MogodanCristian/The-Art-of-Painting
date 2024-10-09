import React, { useEffect, useState } from 'react';
import ArtCard from '../components/ArtCard';
import { CircularProgress, Fade } from '@mui/material'; // Import the required Material-UI components
import OptionsDrawer from '../components/OptionsDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaintings } from '../redux/paintingsSlice';

const Gallery = () => {
  const dispatch = useDispatch();
  
  // Use useSelector to get paintings from the Redux store
  const artPieces = useSelector((state) => state.paintings.list);
  const loading = useSelector((state) => state.paintings.status === 'loading'); // Get loading status from Redux

  // Fetch paintings when the component mounts
  useEffect(() => {
    dispatch(getAllPaintings()); // Call the thunk to fetch paintings
  }, [dispatch]);

  return (
    <>
      <OptionsDrawer />
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
              <div key={piece._id} style={{ margin: '15px' }}> {/* Use piece.id for unique key */}
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
