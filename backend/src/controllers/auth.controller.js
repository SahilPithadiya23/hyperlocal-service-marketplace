const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
    const {firstName, lastName, email, password, phone,address,city,pincode,lat,long} = req.body;

    const isAlreadyExist = await userModel.findOne({email});
    if(isAlreadyExist){
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({firstName, lastName, email, password: hashedPassword, phone,address,city, pincode, lat, long});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(201).json({message: 'User registered successfully',
    user: {_id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    }
});
}

async function loginUser(req, res) {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message: 'Invalid email or password'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(200).json({
    message: 'User logged in successfully',
    user: {_id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    }
});
}

module.exports = {registerUser, loginUser};