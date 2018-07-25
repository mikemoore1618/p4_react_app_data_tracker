const
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js'),
    { JWT_SECRET } = process.env

    function signToken(user) {
        const userData = user.toObject()
        //remove password from token
        delete userData.password
        //return token
        return jwt.sign(userData, JWT_SECRET)
    }

    function verifyToken(req, res, next) {
        //get token from headers of incoming request
        const token = req.get('token')
        // console.log(token)
        //if no token is provided, deny access
        if(!token) return res.json({ message: 'error', error: 'no token provided' })
        //otherwise, if there is token, try to verify it
        jwt.verify(token, JWT_SECRET, (err, decodedData) => {
            // if theres a porblem with verification deny access
            if(err) return res.json({ message: 'error', error: 'invalid token' })
            // console.log(token)
            // otherwise search for user by the id that was imbeded in the token
            User.findById(decodedData._id, (err, user) => {
                //if no user, deny access:
                if(!user) return res.json({ message: 'error', error: 'invalid token'})
                // add the user to the request object (the current user)
                req.user = user
                //go on to process the route:
                next()
            })
        })
    }

    module.exports = {
        signToken,
        verifyToken
    }

