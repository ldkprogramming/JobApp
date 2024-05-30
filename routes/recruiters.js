const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const JobOffer = require('../models/jobOffer');
const Organisation = require('../models/organisation');
const RecruiterOrganisation = require('../models/recruiterOrganisation');
const organisation = require("../models/organisation");

router.get('/:idRecruiter', asyncHandler(async (req, res, next) => {
    res.render("recruiter/home", {idRecruiter: req.session.rolesIdMap.recruiterId, idAdmin:req.session.rolesIdMap.adminId, idApplicant:req.session.rolesIdMap.applicantId});
}));

router.get('/:idRecruiter/job-offers/history', asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusByIdRecruiterWithInfo('published', Number(req.params.idRecruiter))
    res.render("recruiter/manage_job_offers", {jobOffers: jobOffers, idRecruiter: req.session.rolesIdMap.recruiterId, idAdmin:req.session.rolesIdMap.adminId, idApplicant:req.session.rolesIdMap.applicantId})
}));

router.get('/:idRecruiter/organisation-registration-request', asyncHandler(async (req, res, next) => {
    res.render("recruiter/organisation_registration_request", {idRecruiter: req.session.rolesIdMap.recruiterId, idAdmin:req.session.rolesIdMap.adminId, idApplicant:req.session.rolesIdMap.applicantId});
}))

router.post('/:idRecruiter/organisation-registration-request', asyncHandler(async (req, res, next) => {
    await Organisation.create(req.body.siren, req.body.name, req.body.type, req.body.headquarters, 'onhold');
    res.redirect(`/recruiters/${Number(req.params.idRecruiter)}`);
}));

router.get('/:idRecruiter/join-organisation', asyncHandler(async (req, res, next) => {
    // faudra faire en sorte quil puisse pas rerejoindre une organisation
    // et aussi eviter qd y a plusieurs fois meme demande
    res.render('recruiter/join_organisation', {idRecruiter: req.session.rolesIdMap.recruiterId, idAdmin:req.session.rolesIdMap.adminId, idApplicant:req.session.rolesIdMap.applicantId});
}));

router.post('/:idRecruiter/join-organisation', asyncHandler(async (req, res, next) => {
    // faudra changer en select
    // faut gerer quand y a une erreur pour bien redirect
    await RecruiterOrganisation.create('onhold', req.session.rolesIdMap.recruiterId, req.body.siren);
    res.redirect(`/recruiters/${Number(req.params.idRecruiter)}`);
}));

router.get('/:idRecruiter/create-job-description', asyncHandler(async (req, res, next) => {
    // faudra mettre slmt les organisations avec un lien ACTIF vers notre recruteur
    const organisations = await organisation.getAll();
    res.render('recruiter/create_job_description', {organisations:organisations, idRecruiter: req.session.rolesIdMap.recruiterId, idAdmin:req.session.rolesIdMap.adminId, idApplicant:req.session.rolesIdMap.applicantId});
}));

module.exports = router;
