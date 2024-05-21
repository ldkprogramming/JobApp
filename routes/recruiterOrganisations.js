const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const RecruiterOrganisation = require('../models/recruiterOrganisation');

router.get('/:requestStatus', asyncHandler(async (req, res, next) => {
    const registrationRequests = await RecruiterOrganisation.getAllByStatusWithInfo(req.params.requestStatus);
    res.render('admin/manage_recruiter_registration_requests', {recruiterOrganisations: registrationRequests});
}));

module.exports = router;