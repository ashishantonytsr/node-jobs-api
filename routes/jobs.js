const express = require('express')
const router = express.Router()
const { getAllJobs, getSingleJob, updateJob, deleteJob, createJob } = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router