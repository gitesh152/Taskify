import jwt from 'jsonwebtoken'

//generate jwt token with user._id
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

export default generateToken;