const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
	let errorObj = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong. Try again later'
	}

	if (err.name === 'ValidationError'){
		errorObj.msg = Object.values(err.errors)
			.map(item=> item.message).join(', ')
		errorObj.statusCode = StatusCodes.BAD_REQUEST
	}
	if (err.name === 'CastError'){
		errorObj.msg = `no job found with id ${err.value}`
		errorObj.statusCode = StatusCodes.BAD_REQUEST
	}
	if(err.code && err.code == 11000){
		errorObj.msg = `duplicate value entered for ${Object.keys(err.keyValue)} field`
		errorObj.statusCode = StatusCodes.BAD_REQUEST
	}
  return res.status(errorObj.statusCode).json({ msg: errorObj.msg })
}

module.exports = errorHandlerMiddleware
