const Jobs = require("../models/job.model");
const createError = require("../utils/error");
// const cloudinary = require("cloudinary").v2

const postJob = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      title,
      salary,
      jobType,
      workPlace,
      location,
      jobDescription,
      about,
      skills,
      information,
    } = req.body.newJob;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !salary ||
      !jobType ||
      !workPlace ||
      !location ||
      !jobDescription ||
      !about ||
      !skills ||
      !information
    ) {
      return next(createError(401, "All fields are Required"));
    }
    const skillsArray = skills.split(",").map((item) => item.trim());

    // const imageUrl = await cloudinary.uploader.upload(
    //   req.body?.logoUrl,
    //   { resource_type: 'auto'},
    // );
// console.log(req.body)
    const newJob = new Jobs({ ...req.body.newJob, skills: skillsArray });
    await newJob.save();
    res.status(200).json({
      message: "successful",
      recruiterName: req.user.userName,
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    if (!jobId) return next(createError(401, "Job Id is required"));
    const existingJob = await Jobs.findById(jobId);

    if (!existingJob)
      return next(createError(401, "Job isn't existed, create a new one"));

    let skillsArray = [];
    if (req.body.newJob?.skills) {
      skillsArray = req.body.newJob?.skills.split(",").map((item) => item.trim());
    }
    // const imageUrl = await cloudinary.uploader.upload(
    //   req.body?.logoUrl,
    //   {resource_type: 'auto'}
    // );

    const updatedJob = await Jobs.findByIdAndUpdate(
      jobId,
      { $set: { ...req.body.newJob, skills: skillsArray } },
      { new: true }
    );
    res.status(200).json({
      message: "successful",
      recruiterName: req.user.userName,
    });
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const getJob = await Jobs.find();
    if (!getJob) {
      return next(createError(500, "No job Found"));
    }
    res.status(200).json(getJob);
  } catch (error) {
    next(error);
  }
};

const getFilterJob = async (req, res, next) => {
  try {
    const { title, skills } = req.query;
    if (!title && !skills) {
      return getJobs(req, res, next);
    }
    const skillsArray = skills.split(",").map((item) => item.trim());
    const filtersJob = await Jobs.find({
      $or: [{ title: title }, { skills: { $in: skillsArray } }],
    });
    res.status(200).json(filtersJob);
  } catch (error) {
    next(error);
  }
};

const getJobDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(createError(401, "Id is required"));
    }
    const existingJob = await Jobs.findById(id);
    if (!existingJob)
      return next(createError(401, "Job isn't existed, create a new one"));
    res.status(200).json(existingJob);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postJob,
  updateJob,
  getJobs,
  getFilterJob,
  getJobDetails,
};
