const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const RecruiterOrganisation = require("../models/recruiterOrganisation");
const User = require("../models/user");
const Organisation = require("../models/organisation");
const Recruiter = require("../models/recruiter");
const Applicant = require("../models/applicant");

/* Home */

router.get(
  "/:idAdmin",
  asyncHandler(async (req, res, next) => {
    res.render("admin/home", {
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

/* Organisation History */

router.get(
  "/:idAdmin/organisation-registration-requests/history",
  asyncHandler(async (req, res, next) => {
    let organisations;
    if (req.query.search) {
      organisations = await Organisation.getAllLikeNameOrSirenExceptOnhold(
        req.query.search
      );
    } else {
      organisations = await Organisation.getAllExceptOnHold();
    }

    res.render("admin/organisation_registration_request_history", {
      organisations: organisations,
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

/* Manage Organisations */

// router.get(
//   "search/:SIREN",
//   asyncHandler(async (req, res, next) => {
//     const organisations = await Organisation.getBySiren(req.params.SIREN);
//     res.render("admin/manage_organisation_registration_requests", {
//       organisations: organisations,
//       idAdmin: req.session.rolesIdMap.adminId,
//       idRecruiter: req.session.rolesIdMap.recruiterId,
//       idApplicant: req.session.rolesIdMap.applicantId,
//     });
//   })
// );

router.get(
  "/:idAdmin/organisation-registration-requests/onhold",
  asyncHandler(async (req, res, next) => {
    let organisations;
    if (req.query.siren) {
      organisations = await Organisation.getAllLikeSiren(req.query.siren);
    } else {
      organisations = await Organisation.getAllByStatus("onhold");
    }
    res.render("admin/manage_organisation_registration_requests", {
      organisations: organisations,
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idAdmin/accept-organisation/:SIREN",
  asyncHandler(async (req, res, next) => {
    const SIREN = Number(req.params.SIREN);
    await Organisation.changeStatus(SIREN, "accepted");

    // obtenir le ou les recruteurs qui ont fait la demande et les accepter
    const recruiterOrganisations =
      await RecruiterOrganisation.getAllByIdOrganisation(SIREN);
    for (let recruiterOrganisation of recruiterOrganisations) {
      await RecruiterOrganisation.changeStatusRecruiter(
        "accepted",
        recruiterOrganisation.idrecruiter,
        recruiterOrganisation.idorganisation
      );
      await Recruiter.changeStatusRecruiter(
        "accepted",
        recruiterOrganisation.idrecruiter
      );
      // faut delete le compte applicant de lutilisateur
      let idApplicant = await Applicant.getIdByIdUser(
        await Recruiter.getIdUserById(recruiterOrganisation.idrecruiter)
      );
      if (idApplicant !== null) {
        await Applicant.deleteById(idApplicant);
      }
    }

    res.redirect(
      `/admins/${req.params.idAdmin}/organisation-registration-requests/onhold`
    );
  })
);

router.post(
  "/:idAdmin/reject-organisation/:SIREN",
  asyncHandler(async (req, res, next) => {
    const SIREN = Number(req.params.SIREN);
    // on supprime la demande, et lorganisation, mais pas le compte
    const recruiterOrganisations =
      await RecruiterOrganisation.getAllByIdOrganisation(SIREN);
    await RecruiterOrganisation.deleteByIdOrganisation(SIREN);
    await Organisation.delete(SIREN);

    res.redirect(
      `/admins/${req.params.idAdmin}/organisation-registration-requests/onhold`
    );
  })
);

/* Manage Recruiters */

router.get(
  "/:idAdmin/recruiter-registration-requests/onhold",
  asyncHandler(async (req, res, next) => {
    const recruiterInfos = await Recruiter.getAllJoining();
    res.render("admin/manage_recruiter_registration_requests", {
      recruiterInfos: recruiterInfos,
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idAdmin/accept-recruiter/:idRecruiter/:idUser/:siren",
  asyncHandler(async (req, res, next) => {
    const idRecruiter = Number(req.params.idRecruiter);
    await Recruiter.changeStatusRecruiter("accepted", idRecruiter);
    await RecruiterOrganisation.changeStatusRecruiter(
      "accepted",
      idRecruiter,
      req.params.siren
    );
    // faut delete le compte user du recruiter
    let idApplicant = await Applicant.getIdByIdUser(Number(req.params.idUser));
    if (idApplicant !== null) {
      await Applicant.deleteById(idApplicant);
    }
    res.redirect(
      `/admins/${req.params.idAdmin}/recruiter-registration-requests/onhold`
    );
  })
);

router.post(
  "/:idAdmin/reject-recruiter/:idRecruiter/:idUser/:siren",
  asyncHandler(async (req, res, next) => {
    const idRecruiter = Number(req.params.idRecruiter);
    // on supprime uniquement le recruiter organisation
    await RecruiterOrganisation.deleteByIdOrganisationAndIdRecruiter(
      req.params.siren,
      idRecruiter
    );
    res.redirect(
      `/admins/${req.params.idAdmin}/recruiter-registration-requests/onhold`
    );
  })
);

/* Manage Users */

router.get(
  "/:idAdmin/users",
  asyncHandler(async (req, res, next) => {
    let users;
    if (req.query.search) {
      users = await User.getAllLikeLastnameOrFirstname(req.query.search);
    } else {
      users = await User.getAll();
    }
    res.render("admin/manage_users", {
      users: users,
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idAdmin/give-admin-rights/:iduser",
  asyncHandler(async (req, res, next) => {
    const iduser = Number(req.params.iduser);
    await User.giveAdminRight(iduser);
    await Recruiter.deleteByUserId(iduser);
    await Applicant.deleteByUserId(iduser);
    res.redirect(`/admins/${req.params.idAdmin}/users`);
  })
);

router.post(
  "/:idAdmin/delete-users/:iduser",
  asyncHandler(async (req, res, next) => {
    const iduser = Number(req.params.iduser);
    await User.deleteUser(iduser);
    res.redirect(`/admins/${req.params.idAdmin}/users`);
  })
);

module.exports = router;
