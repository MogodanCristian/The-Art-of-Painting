import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

// Assuming the JSON file is placed in the public directory or can be imported
import { paintersData } from '../../public/painters';  // Adjust the path accordingly
import { useParams } from 'react-router-dom';

const Painter = () => {
  const id = useParams().id
  const [criminal, setCriminal] = useState(null);

  useEffect(() => {
    const specificCriminal = paintersData.find(painter => painter.id == id)
    console.log(paintersData)
    setCriminal(specificCriminal);
  }, []);

  if (!criminal) return null; // Add a safeguard if criminal data isn't available yet

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Hire a Criminal
      </Typography>
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" // Center horizontally
        alignItems="center"     // Center vertically if needed
        style={{ minHeight: '100vh' }} // Full height of viewport for better vertical centering
      >
        <Grid item xs={12} sm={8} md={6} key={criminal.id}>
          <Card>
            <CardMedia
              component="img"
              alt={criminal.name}
              image={criminal.profile_picture}
              title={criminal.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {criminal.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Crime: {criminal.crime}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {criminal.description}
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Hiring Price: {criminal.hiringPrice}
              </Typography>
            </CardContent>
              <Button size="small" color="primary" variant="contained">
                Hire {criminal.name}
              </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Painter;
