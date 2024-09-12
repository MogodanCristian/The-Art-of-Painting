import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  // Function to handle the redirect
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '500px',
        }}
      >
        <Typography variant="h1" component="h1" color="error" gutterBottom>
          403
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          You do not have permission to access this page. Please check your credentials or contact the administrator.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ marginTop: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
