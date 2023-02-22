const db = require('../config/db')
 const jwt = require('jsonwebtoken')
 const asyncHandler = require('express-async-handler')

 const protect = asyncHandler(async (req, res, next) => {
    let token

  

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
     
       try{
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        //varify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //get user from token
        const { rows } = await db.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [decoded.id])

        req.user = rows[0]

        next()
       }catch(error){
          console.log(error)
          res.status(401)
          throw new Error('Not authorized')
       }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
 })

 module.exports = { protect } 

