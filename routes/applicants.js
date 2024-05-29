const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get('/:idApplicant', asyncHandler(async (req, res, next) => {
    res.render("recruiter/home");
}));

router.get('/:idApplicant/job-offers/published', asyncHandler(async (req, res, next) => {

}));

router.get('/:idApplicant/job-applications', asyncHandler(async (req, res, next) => {

}));

router.get('/:idApplicant/become-recruiter', asyncHandler(async (req, res, next) => {

}));

module.exports = router;