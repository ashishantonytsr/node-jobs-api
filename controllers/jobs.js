const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async(req, res)=>{
	const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
	res.status(StatusCodes.OK).json({count: jobs.length, jobs: jobs})
}

const getSingleJob = async(req, res)=>{
	// grabing user obj & params obj from req obj
	const {user: {userId}, params: {id: jobId}} = req
	// finding job with jobId & userId
	const job = await Job.findOne(
		{ _id: jobId, createdBy: userId}
	)
	if (!job){
		throw new NotFoundError(`no job with id ${jobId}`)
	}
	res.status(StatusCodes.OK).json({job})
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