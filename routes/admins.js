const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AdminOrganisation = require("../models/adminOrganisation");
const RecruiterOrganisation = require("../models/recruiterOrganisation");
const User = require("../models/user");

router.get(
  "/:idAdmin",
  asyncHandler(async (req, res, next) => {
    res.render("admin/home", {idAdmin: req.session.rolesIdMap.adminId});
  })
);

router.get(
  "/:idAdmin/organisation-registration-requests/onhold",
  asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo(
      "onhold"
    );
    res.render("admin/manage_organisation_registration_requests", {
      adminOrganisations: adminOrganisations, idAdmin: req.session.rolesIdMap.adminId
    });
  })
);

router.get(
  "/:idAdmin/recruiter-registration-requests/onhold",
  asyncHandler(async (req, res, next) => {
    const registrationRequests =
      await RecruiterOrganisation.getAllByStatusWithInfo("onhold");
    res.render("admin/manage_recruiter_registration_requests", {
      recruiterOrganisations: registrationRequests, idAdmin: req.session.rolesIdMap.adminId
    });
  })
);

router.get(
  "/:idAdmin/organisation-registration-requests/history",
  asyncHandler(async (req, res, next) => {
    const adminOrganisations = await AdminOrganisation.getAllByStatusWithInfo(
      "accepted"
    );
    adminOrganisations.push(
      ...(await AdminOrganisation.getAllByStatusWithInfo("rejected"))
    );
    res.render("admin/organisation_registration_request_history", {
      adminOrganisations: adminOrganisations, idAdmin: req.session.rolesIdMap.adminId
    });
  })
);

router.get('/:idAdmin/users', asyncHandler(async (req, res, next) => {
    const users = await User.getAll();
    res.render("admin/manage_users", { users: users, idAdmin: req.session.rolesIdMap.adminId });
}));

module.exports = router;
