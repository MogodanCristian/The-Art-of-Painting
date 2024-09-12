import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// Define the PainterCard component
const PainterCard = ({ profilePicture, name, crime, priceForService }) => {
  return (
    <Card sx={{ width: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="300" // Adjust the height as needed
        image={profilePicture || 'default-profile-pic.jpg'} // Default image if none provided
        alt={name}
        sx={{ width: '100%', objectFit: 'cover' }} // Ensure the image covers the entire width
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Crime: {crime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price for Service: ${priceForService.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PainterCard;
