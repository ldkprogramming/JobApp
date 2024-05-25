const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Organisation = require('../models/organisation');
const JobOffer = require('../models/jobOffer');
const JobDescription = require('../models/jobDescription');

router.get('/get-all-users', asyncHandler(async (req, res, next) => {
    const result = await User.getAll();
    res.render("test/get_all_users", { title: "all users", users: result });
}));

router.get('/get-all-organisations', asyncHandler(async (req, res, next) => {
    const result = await Organisation.getAll();
    res.render("test/get_all_organisations", {title: "all organisations", organisations: result});
}));

router.get('/get-all-job-offers', asyncHandler(async (req, res, next) => {
    const result = await JobOffer.getAll();
    res.render("test/get_all_job_offers", {title: "all job offers", jobOffers: result});
}));

router.get('/get-all-job-descriptions',  asyncHandler(async (req, res, next) => {
    const result = await JobDescription.getAll();
    res.render("test/get_all_job_descriptions", {title: "all job descriptions", jobDescriptions: result});
}));

router.get('who-am-i', asyncHandler(async(req, res, next) => {
    res.json({
        'user' : req.session.user,
        'roles' : req.session.roles
    })
}))

module.exports = router;