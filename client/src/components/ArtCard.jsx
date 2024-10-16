import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const ArtCard = ({ image, artist, year, value }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Art piece"
        width="200"
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Artist: {artist}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year Published: {year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Value: {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArtCard;