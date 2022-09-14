const { BadRequestError,NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/Job");


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
  const {body:{company,position},user:{userID},params:{id:jobID}} = req;
  if(!company||!position){
    throw new BadRequestError("Company or position can't be empty");
  }
  const job = await JobModel.findByIdAndUpdate({_id: jobID,createdBy:userID},req.body,{new:true,runValidators:true});
  if(job){
    res.status(StatusCodes.CREATED).json(job);
  }else{
    throw new NotFoundError("invalid job ID")
  }
};
const deleteJob = async (req, res) => {
  const {user:{userID},params:{id:jobID}} = req;
 
  const job = await JobModel.findByIdAndRemove({_id: jobID,createdBy:userID});
  if(job){
    res.status(StatusCodes.OK).json(job);
  }else{
    throw new NotFoundError("invalid job ID")
  }
};
const getJob = async (req, res) => {
  const {user:{userID},params:{id:jobID}} = req;
  const job = await JobModel.findOne({_id:jobID,createdBy:userID});
  if(job){
    res.status(StatusCodes.OK).json(job);

  }else{
    throw new NotFoundError("invalid job ID")
  }
};

module.exports = {
  getAllJobs,
  getJob,
  updateJobs,
  createJob,
  deleteJob,
};
