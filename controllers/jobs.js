const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/Job");
const UserModel = require("../models/User.js");


const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({createdBy:req.user.userID}).sort('createdAt');;
  res.status(StatusCodes.OK).json({nbHits:jobs.length,jobs});
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
const updateJobs = async (req, res) => {
  res.send("update Job");
};
const deleteJob = async (req, res) => {
  res.send("delete Job");
};
const getJob = async (req, res) => {
  res.send("get Job");
};

module.exports = {
  getAllJobs,
  getJob,
  updateJobs,
  createJob,
  deleteJob,
};
