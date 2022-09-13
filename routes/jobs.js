const express = require("express");

const {
  getJob,
  updateJobs,
  getAllJobs,
  createJob,
  deleteJob,
} = require("../controllers/jobs");
const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").delete(deleteJob).get(getJob).patch(updateJobs);

module.exports = router
