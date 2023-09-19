import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../config/generateToken.js'

const signup = asyncHandler(async (req, res) => {
    try {

        const { name, email, password, pic } = req.body
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(409);
            throw new Error('User already exists')
        }

        const newUser = await User.create({ name, email, password, pic });

        if (newUser)
            res.status(201).json({
                success: true,
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    pic: newUser.pic,
                    token: generateToken(newUser._id),
                }
            })

    }
    catch (e) {
        res.json({
            //Since error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {

            res.status(201).json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id),
                }
            })
        }
        else {
            res.status(401)
            throw new Error('Invalid Email or Password')
        }
    }
    catch (e) {
        res.json({
            message: e.message,
            stack: e.stack,
        });
    }

})

const allUsers = asyncHandler(async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {}
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }).select('-password')
        res.status(201).json({
            success: true,
            users
        })
    }
    catch (e) {
        res.json({
            error: e.message,
            stack: e.stack,
        })
    }
})

export { signup, login, allUsers }