import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//authentication middleware to authenticate user based on Brearer token sent in req.headers
const authenticate = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select('-password')
            if (user) {
                req.user = user
                next()
            }
            else {
                res.status(401);
                throw new Error('Not Authorized ..., (Token failed)')
            }
        }
        else {
            res.status(401)
            throw new Error('Not Authorized ..., (No Token)')
        }
    }
    catch (e) {
        res.json({
            error: e.message,
            stack: e.stack,
        })
    }
}

export default authenticate