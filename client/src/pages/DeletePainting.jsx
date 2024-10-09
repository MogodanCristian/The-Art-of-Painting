import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Box, Typography } from '@mui/material';
import OptionsDrawer from '../components/OptionsDrawer';
import ArtCard from '../components/ArtCard'; // Import the ArtCard component
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'; // Import the confirm modal
import { deletePainting } from '../redux/paintingsSlice'; // Redux action to delete the painting

const DeletePainting = () => {
  const paintings = useSelector((state) => state.paintings.list);
  const dispatch = useDispatch();

  const [searchCriteria, setSearchCriteria] = useState({
    _id: '',
    year: '',
    value: '',
    artist: ''
  });

  const [selectedPainting, setSelectedPainting] = useState(null); // State to track selected painting for confirmation
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleCardClick = (painting) => {
    setSelectedPainting(painting); // Set the selected painting
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the confirmation modal
  };

  const handleDeletePainting = () => {
    // Dispatch Redux action to delete the painting by _id
    dispatch(deletePainting(selectedPainting._id));
    setIsModalOpen(false); // Close the modal after deletion
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
          Search and Delete Paintings
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

        {/* Modal for confirming delete action */}
        {selectedPainting && (
          <ConfirmDeleteModal
            open={isModalOpen}
            handleClose={handleModalClose}
            handleDelete={handleDeletePainting}
            painting={selectedPainting}
          />
        )}
      </Box>
    </>
  );
};

export default DeletePainting;
