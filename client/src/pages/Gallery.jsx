import React from 'react'
import ArtCard from '../components/ArtCard'

const Gallery = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ArtCard
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" // Replace with the actual image URL
        artist="John Doe"
        year="2024"
        value="$5,000"
      />
  </div>
  )
}

export default Gallery
