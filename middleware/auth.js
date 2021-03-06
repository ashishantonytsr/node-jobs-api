const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async(req, res, next)=>{
	// check header
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')){
		throw new UnauthenticatedError('invalid authentication')
	}
	const token = authHeader.split(' ')[1]
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		// attach user to job routes
		const user = await User.findById(payload.userId).select('-password')
		req.user = {userId: user._id, name: user.name}
		next()
	} catch (error) {
		throw new UnauthenticatedError('Authentication failed')
	}
}

module.exports = authenticationMiddleware