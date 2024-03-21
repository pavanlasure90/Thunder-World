const User = require('../models/User');
const { comparePassword, hashPassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
// const { token } = require('morgan');


const test = (req, res) => {
    res.json("Test is working");
}

const handleSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // To check if name is entered
        if (!name) {
            return res.status(400).json({
                error: "Name is required",
            });
        }

        // To check if password is correct
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Password is required and should contain at least 6 characters",
            });
        }

        // To check if Email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: "This email already exists"                
            });
        }

        const hashedPassword = await hashPassword(password);

        // Create user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json({
            message: "Signup successful. Welcome!",
        });
    } catch (error) {
        console.error('An error occurred during signup:', error);
        return res.status(500).json({
            error: "Internal Server Error. Please try again later.",
        });
    }
}



// Login User Endpoint
const handleLogin = async (req, res)=>{
    try {
        const {email , password} = req.body
        
        // check if the user exists ?
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                error : "No user found"
            })
        }

        // Check if Password matches ?
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email , id: user._id , name:user.name}, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error : "Password do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res)=>{
    const { token } = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user)=>{
            if(err) throw err
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    test,
    handleSignup,
    handleLogin,
    getProfile
};
