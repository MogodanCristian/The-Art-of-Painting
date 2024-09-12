import React, { useEffect, useState } from 'react';
import PainterCard from '../components/PainterCard'; // Import the PainterCard component
import { CircularProgress, Fade } from '@mui/material'; // Import Material-UI components
import OptionsDrawer from '../components/OptionsDrawer';

const Painters = () => {
  const [painters, setPainters] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/painters.json')
      .then(response => response.json())
      .then(data => {
        setPainters(data);
        setLoading(false); // Turn off loading after the data is fetched
      })
      .catch(error => {
        console.error('Error fetching painters:', error);
        setLoading(false); // Turn off loading in case of error
      });
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
            {painters.map((painter) => (
              <PainterCard
                key={painter.id}
                profilePicture={painter.profile_picture}
                name={painter.name}
                crime={painter.crime}
                priceForService={painter.price_for_service}
              />
            ))}
          </div>
        </Fade>
      )}
    </>
  );
}

export default Painters;
