import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const EditPaintingModal = ({ open, handleClose, painting, handleSave }) => {
  const [editedPainting, setEditedPainting] = useState(painting);

  // Update the form fields when the painting changes (when modal opens with a new painting)
  useEffect(() => {
    setEditedPainting(painting);
  }, [painting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPainting({
      ...editedPainting,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    handleSave(editedPainting);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Painting
        </Typography>
        <TextField
          label="Artist"
          name="artist"
          value={editedPainting?.artist || ''}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Year"
          name="year"
          value={editedPainting?.year || ''}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Value"
          name="value"
          value={editedPainting?.value || ''}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Image URL"
          name="image"
          value={editedPainting?.image || ''}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '15px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          sx={{ marginRight: '10px' }}
        >
          Save Changes
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditPaintingModal;
