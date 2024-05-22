const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const JobApplication = require('../models/jobApplication');

router.get('/', asyncHandler(async (req, res, next) => {
    const jobApplications = await JobApplication.getAll();
    res.render('applicant/applications', {jobApplications: jobApplications});
}));

module.exports = router;