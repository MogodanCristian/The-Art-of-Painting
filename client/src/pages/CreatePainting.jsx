import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Fade } from '@mui/material';
import OptionsDrawer from '../components/OptionsDrawer';
import { useDispatch } from 'react-redux';
import { createPaintings } from '../redux/paintingsSlice';

const CreatePainting = () => {
  const dispatch = useDispatch()

  const [painting, setPainting] = useState({
    image: '',
    artist: '',
    year: '',
    value: ''
  });
  const [loading, setLoading] = useState(true);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPainting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPaintings(painting))
    setPainting({
      image: '',
      artist: '',
      year: '',
      value: ''
    })
  };

  useEffect(() => {
    // Set loading to false after a slight delay to simulate a smoother fade-in
    setTimeout(() => setLoading(false), 200);
  }, []);

  return (
    <>
      <OptionsDrawer />
      {/* Fade component for the form */}
      <Fade in={!loading} timeout={600}>
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom align="center">
            Create a New Painting
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Image URL Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={painting.image}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Artist Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Artist"
                  name="artist"
                  value={painting.artist}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Year Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={painting.year}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Value Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Value"
                  name="value"
                  value={painting.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create Painting
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Fade>
    </>
  );
};

export default CreatePainting;
