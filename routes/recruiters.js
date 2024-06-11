const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const JobOffer = require("../models/jobOffer");
const Organisation = require("../models/organisation");
const RecruiterOrganisation = require("../models/recruiterOrganisation");
const organisation = require("../models/organisation");
const JobDescription = require("../models/jobDescription");
const User = require("../models/user");
const JobApplication = require("../models/jobApplication");

router.get(
  "/:idRecruiter",
  asyncHandler(async (req, res, next) => {
    res.render("recruiter/home", {
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.get(
  "/:idRecruiter/job-offers/history",
  asyncHandler(async (req, res, next) => {
    const jobOffers = await JobOffer.getAllByStatusByIdRecruiterWithInfo(
      "published",
      Number(req.params.idRecruiter)
    );
    res.render("recruiter/manage_job_offers", {
      jobOffers: jobOffers,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.get(
  "/:idRecruiter/organisation-registration-request",
  asyncHandler(async (req, res, next) => {
    res.render("recruiter/organisation_registration_request", {
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idRecruiter/organisation-registration-request",
  asyncHandler(async (req, res, next) => {
    await Organisation.create(
      req.body.siren,
      req.body.name,
      req.body.type,
      req.body.headquarters,
      "onhold"
    );
    res.redirect(`/recruiters/${Number(req.params.idRecruiter)}`);
  })
);

router.get(
  "/:idRecruiter/join-organisation",
  asyncHandler(async (req, res, next) => {
    const organisations =
      await organisation.getSIRENAndNameByNotIdRecruiterAndStatus(
        req.session.rolesIdMap.recruiterId,
        "accepted"
      );
    res.render("recruiter/join_organisation", {
      organisations: organisations,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idRecruiter/join-organisation",
  asyncHandler(async (req, res, next) => {
    // faudra changer en select
    // faut gerer quand y a une erreur pour bien redirect
    await RecruiterOrganisation.create(
      "onhold",
      req.session.rolesIdMap.recruiterId,
      req.body.siren
    );
    res.redirect(`/recruiters/${Number(req.params.idRecruiter)}`);
  })
);

router.get(
  "/:idRecruiter/create-job-description",
  asyncHandler(async (req, res, next) => {
    const organisations = await organisation.getAllByIdRecruiter(
      Number(req.params.idRecruiter)
    );
    res.render("recruiter/create_job_description", {
      organisations: organisations,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.get(
  "/:idRecruiter/create-job-description",
  asyncHandler(async (req, res, next) => {
    const usersInfo = await User.getFirstAndLastName();
    res.render("recruiter/create_job_description", {
      usersInfo: usersInfo,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idRecruiter/create-job-description",
  asyncHandler(async (req, res, next) => {
    await JobDescription.create(
      req.body.title,
      req.body.status,
      req.body.supervisor,
      req.body.type,
      req.body.place,
      req.body.workload,
      req.body.salary,
      req.body.description,
      req.body.siren
    );
    res.redirect(
      `/recruiters/${Number(req.params.idRecruiter)}/create-job-description`
    );
  })
);

// create offer
router.get(
    "/:idRecruiter/create-job-offer",
    asyncHandler(async (req, res, next) => {
        let recruiterOrganisation = await RecruiterOrganisation.getAllByIdRecruiterAccepted(Number(req.params.idRecruiter));
        let descriptionArray = [];
        for (const r of recruiterOrganisation) {
            descriptionArray.push(...(await JobDescription.getAllByIdOrganisation(r.idorganisation)))
        }
        res.render("recruiter/create_job_offer", {
            jobDescriptions : descriptionArray,
            idRecruiter: req.session.rolesIdMap.recruiterId,
            idAdmin: req.session.rolesIdMap.adminId,
            idApplicant: req.session.rolesIdMap.applicantId,
        });
    })
);


router.post(
    "/:idRecruiter/create-job-offer",
    asyncHandler(async (req, res, next) => {
        await JobOffer.create(
            'published',
            req.body.deadline,
            req.body.indication,
            req.body.numberofattachments,
            Number(req.body.idjobdescription),
            Number(req.params.idRecruiter)
        );
        res.redirect(
            `/recruiters/${Number(req.params.idRecruiter)}/create-job-offer`
        );
    })
);

router.get("/:idRecruiter/manage-job-applications/:idOffer", asyncHandler(async (req, res, next) => {
    const offer = await JobOffer.getWithInfo(Number(req.params.idOffer));
    const applications = await JobApplication.getAllByIdOfferWithInfo(Number(req.params.idOffer));
    res.render("recruiter/manage_job_applications", {
        jobOffer: offer,
        jobApplications : applications,
        idRecruiter: req.session.rolesIdMap.recruiterId,
        idAdmin: req.session.rolesIdMap.adminId,
        idApplicant: req.session.rolesIdMap.applicantId,
    })
}));

module.exports = router;
