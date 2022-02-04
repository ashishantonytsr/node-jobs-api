const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async(req, res)=>{
	const user = await User.create({...req.body})
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })
}

const login = async(req, res)=>{
	const {email, password} = req.body
	if (!email || !password){
		throw new BadRequestError('provide email and password')
	}

	const user = await User.findOne({email})
	// compare password
	if (!user){
		throw new UnauthenticatedError('provide valid credentials')
	}
	
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({
		user: { name: user.name },
		token: token
		})
}

module.exports = {
	register, login
}