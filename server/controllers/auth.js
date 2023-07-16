import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.config.js";
import matchedPassword from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

//REGISTER USER

export const register = async (req, res) =>{
    try {
        let uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(uploadedFile)

        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation,
          }
          = req.body;

        const picturePath = uploadedFile.secure_url;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            picturePath: picturePath,
            location,
            occupation,
        });

        await newUser.save();

        res.status(200).json({
            status: true,
            data: newUser,
            message: "Successfully registered"
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

//LOGIN USER

export const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email});

        if(!user){
            res.status(400).json({
                status: false,
                message: "User does not exist"
            })
        }

        const matchedPass = await user.matchPassword(password);
       
        if(!matchedPass){
            res.status(400).json({
                status: false,
                message: "Invalid password"
            })
        }else{
            const secretKey = process.env.JWT_SECRET_KEY || "SecretKey@1234";
            const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '3d'})

            const loggedInUser = await User.findOneAndUpdate({
                _id: user._id
            },
                {
                    $set: {
                        jwt: token
                    }
                },
                {
                    new: true
                })

            res.status(200).json({
                status: true,
                data:{
                    jwt: loggedInUser.jwt
                } ,
                message: "User logged in successfully"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}