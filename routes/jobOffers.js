const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const JobOffer = require('../models/jobOffer');

router.get('/published', asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusWithInfo('published');
    res.render('applicant/offers', {jobOffers: jobOffers});
}));


module.exports = router;