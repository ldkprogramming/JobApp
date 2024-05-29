const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const AdminOrganisation = require("../models/adminOrganisation");
const RecruiterOrganisation = require("../models/recruiterOrganisation");

router.get('/:idAdmin', asyncHandler(async (req, res, next) => {
    res.render("admin/home");
}));

router.get('/:idAdmin/organisation-registration-requests/onhold', asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo('onhold');
    res.render('admin/manage_organisation_registration_requests', {adminOrganisations : adminOrganisations});
}));

router.get('/:idAdmin/recruiter-registration-requests/onhold', asyncHandler(async (req, res, next) => {
    const registrationRequests = await RecruiterOrganisation.getAllByStatusWithInfo('onhold');
    res.render('admin/manage_recruiter_registration_requests', {recruiterOrganisations: registrationRequests});
}));


router.get('/:idAdmin/organisation-registration-requests/history', asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo('accepted');
    adminOrganisations.push(...(await AdminOrganisation.getAllByStatusWithInfo('rejected')));
    res.render('admin/organisation_registration_request_history', {adminOrganisations : adminOrganisations});
}));


module.exports = router;