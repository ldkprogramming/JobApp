const express = require('express');
const asyncHandler = require('express-async-handler');
const AdminOrganisation = require('../models/adminOrganisation');
const router = express.Router();

router.get('/onhold', asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo('onhold');
    res.render('admin/manage_organisation_registration_requests', {adminOrganisations : adminOrganisations});
}));

router.get('/history', asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo('accepted');
    adminOrganisations.push(...(await AdminOrganisation.getAllByStatusWithInfo('rejected')));
    res.render('admin/organisation_registration_request_history', {adminOrganisations : adminOrganisations});
}));

module.exports = router;