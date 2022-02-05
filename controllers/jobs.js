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
	const {
		user: {userId}, 
		params: {id: jobId},
		body: {company, position}
	} = req
	// checking if empty (fields not provided is fine)
	if (company === '' || position === ''){
		throw new BadRequestError('company or position fields cannot be empty')
	}
	const job = await Job.findOneAndUpdate(
		{_id: jobId, createdBy: userId},
		req.body,
		{new: true, runValidators: true}
	)
	if (!job){
		throw new NotFoundError(`no job with id ${jobId}`)
	}
	res.status(StatusCodes.OK).json({job})

}

const deleteJob = async(req, res)=>{
	const {
		user : {userId},
		params : {id: jobId}
	} = req
	const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId})
	if (!job){
		throw new BadRequestError(`no job with id ${id}`)
	}
	res.status(StatusCodes.OK).json({job})
}

module.exports = {
	getAllJobs, getSingleJob,
	createJob,
	updateJob,
	deleteJob
}