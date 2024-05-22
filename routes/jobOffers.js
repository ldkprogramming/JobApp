const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const JobOffer = require('../models/jobOffer');

router.get('/published', asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusWithInfo('published');
    res.render('applicant/offers', {jobOffers: jobOffers});
}));

router.get('/history', asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusWithInfo('published');
    jobOffers.push(...(await JobOffer.getAllByStatusWithInfo('expired')));
    res.render('recruiter/manage_job_offers', {jobOffers: jobOffers});
}));


module.exports = router;