const Job = require('../models/Job')
const {StatusCodes, CREATED} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const getAllJobs = async(req, res)=>{
	res.send('all jobs')
}

const getSingleJob = async(req, res)=>{
	res.send('get single jobs')
}

const createJob = async(req, res)=>{
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req, res)=>{
	res.send('update jobs')
}

const deleteJob = async(req, res)=>{
	res.send('delete job')
}

module.exports = {
	getAllJobs, getSingleJob,
	createJob,
	updateJob,
	deleteJob
}