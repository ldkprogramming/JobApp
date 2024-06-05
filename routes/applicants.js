const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const JobOffer = require("../models/jobOffer");
const JobApplication = require("../models/jobApplication");
const Recruiter = require("../models/recruiter");
const Attachement = require("../models/attachment");

router.get(
  "/:idApplicant",
  asyncHandler(async (req, res, next) => {
    res.render("applicant/home", {
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
    });
  })
);

router.get(
  "/:idApplicant/job-offers/published",
  asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusWithInfo("published");
    res.render("applicant/offers", {
      jobOffers: jobOffers,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
    });
  })
);

router.get(
  "/:idApplicant/job-applications",
  asyncHandler(async (req, res, next) => {
    const jobApplications =
      await JobApplication.getNameAndTitleAndDescriptionByIdApplicant(
        req.params.idApplicant
      );
    res.render("applicant/applications", {
      jobApplications: jobApplications,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
    });
  })
);

router.post(
  "/:idApplicant/job-applications/:idJobOffer",
  asyncHandler(async (req, res, next) => {
    await JobApplication.create(req.params.idApplicant, req.params.idJobOffer);
    const jobApplications = await JobApplication.getIdByApplicantAndJobOffer(
      req.params.idApplicant,
      req.params.idJobOffer
    );
    await Attachement.create(jobApplications, req.body.url);
    res.redirect(`/applicants/${req.params.idApplicant}/job-applications`);
  })
);

router.get(
  "/:idApplicant/become-recruiter",
  asyncHandler(async (req, res, next) => {
    // a faire
    res.render("applicant/recruiter_registration_request", {
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
    });
  })
);

router.post(
  "/:idApplicant/become-recruiter",
  asyncHandler(async (req, res, next) => {
    // ptet verifications de si deja compte recruiter
    await Recruiter.create(req.session.rolesIdMap.id);
    const newId = await Recruiter.getIdByIdUser(req.session.rolesIdMap.id);
    req.session.rolesIdMap.recruiterId = newId;
    res.redirect(`/recruiters/${newId}`);
  })
);

router.get(
  "/:idApplicant/complete-offer/:idJobApplication",
  asyncHandler(async (req, res, next) => {
    const jobOffers =
      await JobOffer.getAllByIdApplicantAndOfferIdAndApplicationId(
        req.params.idJobApplication
      );
    res.render("applicant/complete_offer", {
      jobOffers: jobOffers,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idJobApplication: req.params.idJobApplication,
    });
  })
);

router.post(
  "/:idApplicant/complete-job-applications/:idJobOffer",
  asyncHandler(async (req, res, next) => {
    const idJobApplication = await JobApplication.getIdByApplicantAndJobOffer(
      req.params.idApplicant,
      req.params.idJobOffer
    );
    await Attachement.create(idJobApplication, req.body.url);
    res.redirect(`/applicants/${req.params.idApplicant}/job-applications`);
  })
);

module.exports = router;
