const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AdminOrganisation = require("../models/adminOrganisation");
const RecruiterOrganisation = require("../models/recruiterOrganisation");
const User = require("../models/user");
const Organisation = require("../models/organisation");
const recruiterOrganisation = require("../models/recruiterOrganisation");
const organisation = require("../models/organisation");
const Recruiter = require("../models/recruiter");

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
    const organisations = await Organisation.getAllExceptOnHold();
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
    res.redirect(
      `/admins/${req.params.idAdmin}/organisation-registration-requests/onhold`
    );
  })
);

router.post(
  "/:idAdmin/reject-organisation/:SIREN",
  asyncHandler(async (req, res, next) => {
    const SIREN = Number(req.params.SIREN);
    await Organisation.changeStatus(SIREN, "rejected");
    res.redirect(
      `/admins/${req.params.idAdmin}/organisation-registration-requests/onhold`
    );
  })
);

/* Manage Recruiters */

router.get(
  "/:idAdmin/recruiter-registration-requests/onhold",
  asyncHandler(async (req, res, next) => {
    const recruiterInfos = await Recruiter.getAllByStatusWithInfo("onhold");
    res.render("admin/manage_recruiter_registration_requests", {
      recruiterInfos: recruiterInfos,
      idAdmin: req.session.rolesIdMap.adminId,
      idRecruiter: req.session.rolesIdMap.recruiterId,
      idApplicant: req.session.rolesIdMap.applicantId,
    });
  })
);

router.post(
  "/:idAdmin/accept-recruiter/:idRecruiter/:idUser",
  asyncHandler(async (req, res, next) => {
    const idRecruiter = Number(req.params.idRecruiter);
    await Recruiter.changeStatusRecruiter("accepted", idRecruiter);
    await Recruiter.changeStatusUser(0, req.params.idUser);
    res.redirect(
      `/admins/${req.params.idAdmin}/recruiter-registration-requests/onhold`
    );
  })
);

router.post(
  "/:idAdmin/reject-recruiter/:idRecruiter/:idUser",
  asyncHandler(async (req, res, next) => {
    const idRecruiter = Number(req.params.idRecruiter);
    await Recruiter.changeStatusRecruiter("rejected", idRecruiter);
    await RecruiterOrganisation.changeStatusByRecruiter(
      "rejected",
      idRecruiter
    ); // Reject recruiter for this organisation however organisation could still be accepted
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
          users = await User.getAllLikeLastnameOrFirstname(req.query.search)
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
