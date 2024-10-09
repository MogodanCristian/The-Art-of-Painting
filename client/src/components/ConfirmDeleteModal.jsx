import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmDeleteModal = ({ open, handleClose, handleDelete, painting }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-delete-modal"
      aria-describedby="confirm-delete-description"
    >
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
        <Typography id="confirm-delete-modal" variant="h6" component="h2" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography id="confirm-delete-description" sx={{ mb: 2 }}>
          Are you sure you want to delete the painting by {painting.artist} from the year {painting.year}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
