const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	name:{
		type: String,
		required: [true, "Please provide a name"],
		minLength: 3,
		maxLength: 30
	},
	email:{
		type: String,
		required: [true, "Please provide email"],
		match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
		unique: true
	},
	password:{
		type: String,
		required: [true, "Please provide password"],
		minLength: 8,
		maxLength: 30
	},
})

module.exports = mongoose.model('User',UserSchema)