const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get('/:idRecruiter', asyncHandler(async (req, res, next) => {
    res.render("recruiter/home");
}));

router.get('/:idRecruiter/job-offers/history', asyncHandler(async (req, res, next) => {

}));

module.exports = router;
