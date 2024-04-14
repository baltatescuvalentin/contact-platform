import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            firstname,
            lastname
        } = req.body;

        const alreadyExists = await User.findOne({ where: { email: email }});

        if (alreadyExists) {
            return res.status(409).json({
                message: 'This email already exists',
            });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            username: username,
        });

        if (!newUser) {
            return res.status(400).json({
                message: 'An error occured',
            })
        }

        res.status(201).json({
            message: 'User successfully created!',
        });
    }   
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const login = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;

        const user = await User.findOne({ where: { username: username }});

        if (!user) {
            return res.status(404).json({
                message: 'Username not correct',
            })
        }

        const isMatchedPassowrd = await bcrypt.compare(password, user.password);

        if (!isMatchedPassowrd) {
            return res.status(400).json({
                message: 'Password incorrect!',
            })
        }

        const token = jwt.sign({
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            token: token,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getUserInformation = async (req, res) => {
    try {
        const {
            email,
        } = req.body;

        const user = await User.findOne({ where: { email: email }});

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }

        res.status(200).json({
            userData: data,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}