import { useEffect, useState } from 'react'
import { 
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
 } from 'react-router-dom'
 import Login from './pages/Login'
import './App.css'
import Gallery from './pages/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import Unauthorized from './pages/Unauthorized'
import { jwtDecode } from 'jwt-decode'
import { loginSuccess } from './redux/authSlice'

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('USER_DATA'));
    if (user) {
      dispatch(loginSuccess({user:user.user, token: user.token}));
    }
  }, []);
  return (
    <>
      <Router>
      <>
        <Routes>
          <Route path='/login' element={user ? <Navigate to={'/gallery'}/> : <Login />} />
          <Route path='/gallery' element={user? <Gallery /> : <Navigate to={'/login'}/>} />
          <Route path='/' element={user ? <Gallery /> : <Navigate to={'/login'} />} />
          <Route path='/unauthorized' element={<Unauthorized/>}/>
        </Routes>
      </>
    </Router>
    </>
  )
}

export default App
