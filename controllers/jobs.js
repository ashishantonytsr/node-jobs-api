const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')

const getAllJobs = async(req, res)=>{
	const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
	res.status(StatusCodes.OK).json({jobs: jobs})
}

const getSingleJob = async(req, res)=>{
	res.send('get single jobs')
}

const createJob = async(req, res)=>{
	// checking for duplicates
	const jobDuplicate = await Job.find({createdBy: req.user.userId})
		.where('company').equals(req.body.company)
		.where('position').equals(req.body.position)
	if (jobDuplicate != ''){
		console.log(jobDuplicate);
		throw new BadRequestError('duplicates found')
	}

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