const express = require("express");
const route = express.Router();

const {postJob,updateJob,getJobs,getFilterJob,getJobDetails} = require("../controller/job.controller")
// const verifyUser = require("../../middleware/verifyUser")
const verifyUser = require("../middleware/verifyUser")

route.get("/",getJobs)
route.get("/filter",getFilterJob)
route.get("/details/:id",getJobDetails)
route.post("/add",verifyUser,postJob)
route.put("/edit/:id",verifyUser,updateJob)

module.exports = route;