const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Organisation = require('../models/organisation');
const JobOffer = require('../models/jobOffer');
const JobDescription = require('../models/jobDescription');

router.get('/get-all-users', async (req, res, next) => {
    // result = User.getAll((result) => {
    //     res.render("test/get_all_users", {title: "all users", users: result});
    // });
    try {
        const result = await User.getAll();
        res.render("test/get_all_users", { title: "all users", users: result });
    } catch (err) {
        next(err);  // Handle errors properly
    }
});

router.get('/get-all-organisations', async (req, res, next) => {
    const result = await Organisation.getAll();
    res.render("test/get_all_organisations", {title: "all organisations", organisations: result});
});

router.get('/get-all-job-offers', async (req, res, next) => {
    const result = await JobOffer.getAll();
    res.render("test/get_all_job_offers", {title: "all job offers", jobOffers: result});
});

router.get('/get-all-job-descriptions', async (req, res, next) => {
    const result = await JobDescription.getAll();
    res.render("test/get_all_job_descriptions", {title: "all job descriptions", jobDescriptions: result});
});

module.exports = router;