const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get('/:idAdmin', asyncHandler(async (req, res, next) => {
    res.render("admin/home");
}));

router.get('/:idAdmin/organisation-registration-requests/onhold', asyncHandler(async (req, res, next) => {

}));

router.get('/:idAdmin/recruiter-registration-requests/onhold', asyncHandler(async (req, res, next) => {

}));


router.get('/:idAdmin/organisation-registration-requests/history', asyncHandler(async (req, res, next) => {

}));


module.exports = router;