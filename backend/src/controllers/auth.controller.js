const userModel = require('../models/user.model');
const providerModel = require('../models/sprovider.model');
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
    lat:user.lat,
    long:user.long
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
    lat:user.lat,
    long:user.long
    }
});
}



async function registerProvider(req, res) {
    const {
        firstName,
        lastName,
        serviceName,
        email,
        phone,
        password,
        serviceCategory,
        experience,
        address,
        city,
        pincode,
        lat,
        long
    } = req.body;

        // Check if already exists
        const exists = await providerModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Provider already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create provider
        const provider = await providerModel.create({
            firstName,
            lastName,
            serviceName,
            email,
            phone,
            password: hashedPassword,
            serviceCategory,
            experience,
            address,
            city,
            pincode,
            lat,
            long
        });

        // JWT Token
        const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET);
        res.cookie('providerToken', token);

        // Response
        res.status(201).json({
            message: 'Service Provider registered successfully',
            provider: {
                _id: provider._id,
                firstName: provider.firstName,
                lastName: provider.lastName,
                serviceName: provider.serviceName,
                email: provider.email,
                lat:provider.lat,
                long:provider.long
            }
        });
}

async function loginProvider(req, res) {
    const { email, password } = req.body;
        const provider = await providerModel.findOne({ email });
        if (!provider) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, provider.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET);
        res.cookie('providerToken', token);

        res.status(200).json({
            message: 'Service Provider logged in successfully',
            provider: {
                _id: provider._id,
                firstName: provider.firstName,
                lastName: provider.lastName,
                serviceName: provider.serviceName,
                email: provider.email,
                lat:provider.lat,
                long:provider.long
            }
        });
}


module.exports = {registerUser, loginUser, registerProvider,loginProvider};