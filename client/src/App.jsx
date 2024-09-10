import { useState } from 'react'
import { 
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
 } from 'react-router-dom'
 import Login from './pages/Login'
import './App.css'
import Gallery from './pages/Gallery'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Router>
      <>
        <Routes>
          <Route path='/login' element={user ? <Navigate to={'/gallery'}/> : <Login />} />
          <Route path='/gallery' element={ <Gallery />} />
          <Route path='/' element={user ? <Gallery /> : <Navigate to={'/login'} />} />
        </Routes>
      </>
    </Router>
    </>
  )
}

export default App
