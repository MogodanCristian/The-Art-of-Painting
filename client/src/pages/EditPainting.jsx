import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Box, Typography } from '@mui/material';
import OptionsDrawer from '../components/OptionsDrawer';
import ArtCard from '../components/ArtCard'; // Import the ArtCard component
import EditPaintingModal from '../components/EditPaintingModal'; // Import the modal
import { editPainting } from '../redux/paintingsSlice';

const EditPainting = () => {
  const paintings = useSelector((state) => state.paintings.list);
  const dispatch = useDispatch();

  const [searchCriteria, setSearchCriteria] = useState({
    _id: '',
    year: '',
    value: '',
    artist: ''
  });

  const [selectedPainting, setSelectedPainting] = useState(null); // State to track selected painting for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleCardClick = (painting) => {
    setSelectedPainting(painting); // Set the selected painting
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSavePainting = (updatedPainting) => {
    console.log(updatedPainting)
    // Logic to save the updated painting (e.g., dispatch an action to update the Redux store)
    dispatch(editPainting(
      {
        id: updatedPainting._id,
        data: updatedPainting
      }
    )); // Dispatch action with the updated painting
    setIsModalOpen(false); // Close the modal after saving
  };

  // Filter paintings based on the search criteria
  const filteredPaintings = paintings.filter((painting) => {
    const { _id, year, value, artist } = searchCriteria;

    return (
      (!_id || painting._id.toString() === _id) &&
      (!year || painting.year.toString() === year) &&
      (!value || painting.value.toString() === value) &&
      (!artist || painting.artist.toLowerCase().includes(artist.toLowerCase()))
    );
  });

  return (
    <>
      <OptionsDrawer />
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Search and Edit Paintings
        </Typography>

        {/* Input form for search criteria */}
        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Painting ID"
              name="_id"
              value={searchCriteria._id}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Year"
              name="year"
              value={searchCriteria.year}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Value"
              name="value"
              value={searchCriteria.value}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Artist"
              name="artist"
              value={searchCriteria.artist}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Render matching paintings */}
        <Grid container spacing={2}>
          {filteredPaintings.length > 0 ? (
            filteredPaintings.map((painting) => (
              <Grid item xs={12} sm={6} md={4} key={painting._id}>
                <Box onClick={() => handleCardClick(painting)}>
                  <ArtCard
                    image={painting.image}
                    artist={painting.artist}
                    year={painting.year}
                    value={painting.value}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No paintings match the search criteria.
            </Typography>
          )}
        </Grid>

        {/* Modal for editing painting */}
        {selectedPainting && (
          <EditPaintingModal
            open={isModalOpen}
            handleClose={handleModalClose}
            painting={selectedPainting}
            handleSave={handleSavePainting}
          />
        )}
      </Box>
    </>
  );
};

export default EditPainting;
