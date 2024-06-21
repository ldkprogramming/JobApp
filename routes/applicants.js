const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const JobOffer = require("../models/jobOffer");
const JobApplication = require("../models/jobApplication");
const Recruiter = require("../models/recruiter");
const Attachment = require("../models/attachment");
const Organisation = require("../models/organisation");
const RecruiterOrganisation = require("../models/recruiterOrganisation");
const User = require("../models/user");

const multer = require("multer");
const { join } = require("path");
const fs = require("fs");
const path = require("path");
const asyncFs = require("fs").promises;

// Ensure the upload directory exists or create it
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = join(
      __dirname,
      "/uploads/",
      `offer${req.params.idJobOffer}_applicant${req.params.idApplicant}`
    );
    ensureDirectoryExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* Home */

router.get(
  "/:idApplicant",
  asyncHandler(async (req, res, next) => {
    res.render("applicant/home", {
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idUser: req.session.rolesIdMap.id,
    });
  })
);

/* Job Offers */

router.get(
  "/:idApplicant/job-offers/published",
  asyncHandler(async (req, res, next) => {
    let jobOffers;
    if (req.query.search) {
      jobOffers = await JobOffer.getAllLikeNameOrTitle(
        "published",
        req.query.search
      );
    } else {
      jobOffers = await JobOffer.getAllByStatusWithInfo("published");
    }
    res.render("applicant/offers", {
      jobOffers: jobOffers,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idUser: req.session.rolesIdMap.id,
    });
  })
);

router.get(
  "/:idApplicant/job-applications",
  asyncHandler(async (req, res, next) => {
    let jobApplications;
    if (req.query.search) {
      jobApplications = await JobApplication.getAllLikeNameOrByIdApplicant(
        Number(req.params.idApplicant),
        req.query.search
      );
    } else {
      jobApplications =
        await JobApplication.getNameAndTitleAndDescriptionByIdApplicant(
          req.params.idApplicant
        );
    }
    res.render("applicant/applications", {
      jobApplications: jobApplications,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idUser: req.session.rolesIdMap.id,
    });
  })
);

router.post(
  "/:idApplicant/job-applications/:idJobOffer",
  upload.array("attachments", 20),
  asyncHandler(async (req, res, next) => {
    await JobApplication.create(
      Number(req.params.idApplicant),
      Number(req.params.idJobOffer)
    );
    const jobApplications = await JobApplication.getIdByApplicantAndJobOffer(
      Number(req.params.idApplicant),
      Number(req.params.idJobOffer)
    );
    const fileInsertPromises = req.files.map(async (file) => {
      try {
        // Read the file data asynchronously
        const fileData = await asyncFs.readFile(file.path);

        // Insert the file data into the SQL database
        await Attachment.create(
          jobApplications,
          fileData,
          file.originalname,
          file.mimetype
        );

        // Optionally delete the file from the server after saving to the database
        await asyncFs.unlink(file.path);

        return Promise.resolve(); // Resolve promise if successful
      } catch (err) {
        return Promise.reject(
          `Error processing file ${file.originalname}: ${err}`
        );
      }
    });
    try {
      await Promise.all(fileInsertPromises);
    } catch (err) {
      res.status(500).send(err);
    }
    res.redirect(`/applicants/${req.params.idApplicant}/job-applications`);
  })
);

/* Complete Job Offers */

router.get(
  "/:idApplicant/complete-application/:idJobApplication",
  asyncHandler(async (req, res, next) => {
    // ptet verifier sil a le droit dy aller
    const jobApplication = await JobApplication.getWithInfo(
      req.params.idJobApplication
    );
    console.log(jobApplication);
    res.render("applicant/complete_offer", {
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idUser: req.session.rolesIdMap.id,
      jobApplication: jobApplication,
    });
  })
);
router.post(
  "/:idApplicant/complete-application/:idJobApplication",
  upload.array("attachments", 20),
  asyncHandler(async (req, res, next) => {
    await Attachment.deleteByIdApplication(Number(req.params.idJobApplication));
    const fileInsertPromises = req.files.map(async (file) => {
      try {
        // Read the file data asynchronously
        const fileData = await asyncFs.readFile(file.path);

        // Insert the file data into the SQL database
        await Attachment.create(
          Number(req.params.idJobApplication),
          fileData,
          file.originalname,
          file.mimetype
        );

        // Optionally delete the file from the server after saving to the database
        await asyncFs.unlink(file.path);

        return Promise.resolve(); // Resolve promise if successful
      } catch (err) {
        return Promise.reject(
          `Error processing file ${file.originalname}: ${err}`
        );
      }
    });
    try {
      await Promise.all(fileInsertPromises);
    } catch (err) {
      res.status(500).send(err);
    }
    res.redirect("back");
  })
);

/* Become Recruiter */

router.get(
  "/:idApplicant/become-recruiter",
  asyncHandler(async (req, res, next) => {
    const organisations = await Organisation.getAllByStatus("accepted");
    const recruiterOrganisations = await RecruiterOrganisation.getAllByIdUser(
      req.session.rolesIdMap.id
    );
    res.render("applicant/recruiter_registration_request", {
      organisations: organisations,
      recruiterOrganisations: recruiterOrganisations,
      idApplicant: req.session.rolesIdMap.applicantId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idAdmin: req.session.rolesIdMap.adminId,
      idUser: req.session.rolesIdMap.id,
    });
  })
);

/* Join Organisation */

router.post(
  "/:idApplicant/join-organisation/:idUser",
  asyncHandler(async (req, res, next) => {
    if ((await Recruiter.getIdByIdUser(req.params.idUser)) === null) {
      await Recruiter.create(req.params.idUser, "onhold");
    }
    await RecruiterOrganisation.createByIdUser(
      "onhold",
      req.params.idUser,
      req.body.siren
    );
    res.redirect(`/applicants/${Number(req.params.idApplicant)}`);
  })
);

/* Create Organisation */
router.post(
  "/:idApplicant/create-organisation/:idUser",
  asyncHandler(async (req, res, next) => {
    await Organisation.create(
      req.body.siren,
      req.body.name,
      req.body.type,
      req.body.headquarters,
      "onhold"
    );
    if ((await Recruiter.getIdByIdUser(req.params.idUser)) === null) {
      await Recruiter.create(req.params.idUser, "onhold");
    }
    await RecruiterOrganisation.createByIdUser(
      "onhold",
      req.params.idUser,
      req.body.siren
    );
    res.redirect(`/applicants/${Number(req.params.idApplicant)}`);
  })
);

module.exports = router;
