const express = require('express');
const Painting = require('../models/Painting')
const router = express.Router();

router.post('/create-painting', async(req,res) =>{
    try {
        const painting = new Painting({
            image: req.body.image,
            artist: req.body.artist,
            year: req.body.year,
            value: req.body.value
        })
        const savedUser = await painting.save()
        res.send({painting: painting._id})
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})

router.get('/get-all-paintings', async(req, res) =>{
    try {
        const paintings = await Painting.find()
        res.json(paintings).status(200)
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})

router.get('/get-painting/:paintingID', async(req, res) =>{
    try {
        const painting = await Painting.findById(req.params.paintingID)
        res.json(painting).status(200)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

router.delete('/:paintingID', async (req, res) => {
    try {
      // Fetch all paintings from the database
      let paintings = await Painting.find();
  
      // Find the index of the painting to delete
      const paintingIndex = paintings.findIndex(
        (painting) => painting._id == req.params.paintingID
      );
  
      // If the painting is not found in the array, return a 404 error
      if (paintingIndex === -1) {
        return res.status(404).json("Painting does not exist!");
      }
  
      // Remove the painting from the array
      const deletedPaintingFromArray = paintings.splice(paintingIndex, 1); // Removes the painting from array
  
      // Remove the painting from the database
      const deletedPaintingFromDB = await Painting.findByIdAndDelete(req.params.paintingID);
  
      if (!deletedPaintingFromDB) {
        // If no painting was deleted from the database (as a safeguard), return an error
        return res.status(404).json("Painting not found in the database!");
      }
  
      // Send a success response with the modified array and deleted painting details
      res.status(200).json(paintings);
    } catch (error) {
      // Handle any errors that occur
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  });

router.put('/:paintingID', async (req, res) => {
    try {
      // Fetch all paintings
      const paintings = await Painting.find();
  
      // Find the painting by ID
      const paintingIndex = paintings.findIndex(painting => painting._id.toString() === req.params.paintingID);
  
      if (paintingIndex === -1) {
        return res.status(404).json({ message: 'Painting not found' });
      }
      // Update the painting entry with new data from req.body
      const updatedPainting = { ...paintings[paintingIndex]._doc, ...req.body };
  
      // Replace the old painting in the array
      paintings[paintingIndex] = updatedPainting;
  
      // Optionally save the updated paintings array to the database
      await Painting.updateOne({ _id: req.params.paintingID }, updatedPainting);
  
      // Return the modified array
      res.json(paintings);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  });

router.post("/hacker-request", async(req,res) =>{
  try {
    res.json("Received!")
  } catch (error) {
      res.status(400).send(error);
      console.log(error);
  }
})
module.exports = router