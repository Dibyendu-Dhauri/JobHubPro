const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    logoUrl: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    salary: {
      type: String,
      require: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time"],
      require: true,
    },
    workPlace: {
      type: String,
      enum: ["Remote", "Office"],
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    jobDescription: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    skills: {
      type: [String],
      require: true,
    },
    information: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
