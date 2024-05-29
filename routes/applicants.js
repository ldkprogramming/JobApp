const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const JobOffer = require("../models/jobOffer");
const JobApplication = require("../models/jobApplication");

router.get('/:idApplicant', asyncHandler(async (req, res, next) => {
    res.render("recruiter/home");
}));

router.get('/:idApplicant/job-offers/published', asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusWithInfo('published');
    res.render('applicant/offers', {jobOffers: jobOffers});
}));

router.get('/:idApplicant/job-applications', asyncHandler(async (req, res, next) => {
    const jobApplications = await JobApplication.getNameAndTitleAndDescriptionByIdApplicant(req.params.idApplicant);
    res.render("applicant/applications", { jobApplications: jobApplications });
}));

router.get('/:idApplicant/become-recruiter', asyncHandler(async (req, res, next) => {
    // a faire
}));

module.exports = router;