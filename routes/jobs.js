const express = require('express')
const { getAllJobs, getSingleJob, updateJob, deleteJob, createJob } = require('../controllers/jobs')
const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router