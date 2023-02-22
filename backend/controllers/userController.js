const db = require('../config/db')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// @desc Register a new user
// @route /api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username , email, password } = req.body
    //validation
    if( !username || !email || !password){
        res.status(400)
        throw new Error(message)
    }

    //find if user already exist
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if(rows.length){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create User
    await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword])
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])

    if(result){
        res.status(201).json({
            id : result.rows[0].id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            token: generateToken(result.rows[0].id)
        })

    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc login a user
// @route /api/users/login
//access Public
const loginUser = asyncHandler(async (req , res) => {
    const { email, password } = req.body
   
    const user  = await db.query('SELECT * FROM users WHERE email = $1', [email])
   
    if(user.rows.length && (await bcrypt.compare(password, user.rows[0].password))){
        res.status(200).json({
            id : user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
            token: generateToken(user.rows[0].id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
}