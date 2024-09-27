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

router.delete('/:paintingID', async(req, res) =>{
    try {
        const painting = await Painting.findById(req.params.paintingID)
        if(!painting){
            res.status(404).json("Painting not found!")
        }
        await Painting.deleteOne({
            _id: req.params.paintingID
        })
        res.json(painting._id).status(200)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

router.put('/:paintingID', async(req, res) =>{
    try {
        const updated = await Painting.findByIdAndUpdate(
            {
                _id: req.params.paintingID
            },
            {
                $set: req.body
            });
        res.json(updated._id);
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})
module.exports = router