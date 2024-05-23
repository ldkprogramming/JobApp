const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const JobDescription = require("../models/jobDescription");
const organisation = require("../models/organisation");

router.get(
  "/create-form",
  asyncHandler(async (req, res) => {
    const organisations = await organisation.getAll();
    res.render("recruiter/create_job_description", { organisations });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const {
      title,
      status,
      supervisor,
      type,
      place,
      workload,
      salary,
      description,
      idorganisation,
    } = req.body;
    try {
      await JobDescription.create(
        title,
        status,
        supervisor,
        type,
        place,
        workload,
        salary,
        description,
        idorganisation
      );
      res.redirect("/recruiter/dashboard");
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
