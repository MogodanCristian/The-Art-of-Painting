const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken')

router.post('/register', async(req,res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: 'viewer'
    });
    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }
})

router.post('/login', async(req,res) =>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username, password}).exec();
        if(!user){
            return res.status(400).send('Invalid credentials!');
        }
        //Create and assign a web token
        const token = jwt.sign({
            _id: user._id,
            role: user.role,
            username: user.username,
            }, process.env.SECRET_TOKEN,);
        res.header('auth-token', token).send(token).status(200);

    } catch (error) {
        res.status(400).send(error);
    }
    
})

module.exports = router;