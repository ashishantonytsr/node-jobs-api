const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async(req, res)=>{
	const user = await User.create({...req.body})
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ 
		user: {name: user.name, email: user.email}, 
		token 
	})
}

const login = async(req, res)=>{
	const {email, password} = req.body
	if (!email || !password){
		throw new BadRequestError('provide email and password')
	}

	const user = await User.findOne({email})
	const isPasswordCorrect = await user.comparePassword(password)
	if (!user){
		throw new UnauthenticatedError('provide valid credentials')
	}
	// compare password
	if (!isPasswordCorrect){
		throw new UnauthenticatedError('password does not match')
	}
	
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({
		user: { name: user.name, email: user.email },
		token: token
		})
}

module.exports = {
	register, login
}