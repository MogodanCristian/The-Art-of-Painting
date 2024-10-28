import React, { useEffect, useState } from 'react';
import PainterCard from '../components/PainterCard'; // Import the PainterCard component
import { CircularProgress, Fade } from '@mui/material'; // Import Material-UI components
import OptionsDrawer from '../components/OptionsDrawer';
import { paintersData} from '../../public/painters'; // Import painters from painters.js file
import { useNavigate } from 'react-router-dom';

const Painters = () => {
  const [painters, setPainters] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate()

  useEffect(() => {
    // Directly use the imported painters data
    setPainters(paintersData);
    setLoading(false); // Turn off loading as we have the data already
  }, []);

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
            {painters.map((painter) => (
              <div
                key={painter.id} 
                onClick={() => {navigate("/painters/"+painter.id)}}>
                <PainterCard
                  key={painter.id}
                  profilePicture={painter.profile_picture}
                  name={painter.name}
                  crime={painter.crime}
                  priceForService={painter.price_for_service}
                />
              </div>
            ))}
          </div>
        </Fade>
      )}
    </>
  );
}

export default Painters;
