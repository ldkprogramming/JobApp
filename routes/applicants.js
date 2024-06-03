const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const JobOffer = require("../models/jobOffer");
const JobApplication = require("../models/jobApplication");
const Recruiter = require("../models/recruiter");

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

module.exports = router;
