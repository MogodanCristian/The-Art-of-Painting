import { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material'; // Import the CircularProgress component
import Login from './pages/Login';
import './App.css';
import Gallery from './pages/Gallery';
import { useDispatch, useSelector } from 'react-redux';
import Unauthorized from './pages/Unauthorized';
import Painters from './pages/Painters';
import Painter from './pages/Painter';
import CreatePainting from './pages/CreatePainting';
import EditPainting from './pages/EditPainting';
import DeletePainting from './pages/DeletePainting';
import { loginSuccess } from './redux/authSlice';
import { getAllPaintings } from './redux/paintingsSlice';
import Robots from './pages/Robots';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  
  // New loading state to track user retrieval from localStorage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async user fetch from localStorage
    const user = JSON.parse(localStorage.getItem('USER_DATA'));
    
    if (user) {
      dispatch(loginSuccess({ user: user.user, token: user.token }));
      dispatch(getAllPaintings());
    }
    
    // Set loading to false once the user is checked
    setLoading(false);
  }, [dispatch]);

  // If still loading, show the spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render routes once loading is finished
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={user ? <Navigate to={'/gallery'} /> : <Login />} />
          <Route path='/gallery' element={user ? <Gallery /> : <Navigate to={'/login'} />} />
          <Route path='/' element={user ? <Gallery /> : <Navigate to={'/login'} />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/painters' element={user ? <Painters /> : <Unauthorized />} />
          <Route path='/painters/:id' element={user ? <Painter /> : <Unauthorized />} />
          <Route path='/create-painting' element={user ? <CreatePainting /> : <Unauthorized />} />
          <Route path='/edit-painting' element={user ? <EditPainting /> : <Unauthorized />} />
          <Route path='/delete-painting' element={user ? <DeletePainting /> : <Unauthorized />} />
          <Route path='/robots.txt' element={<Robots/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
