const express = require("express");
const route = express.Router();

const {addJob,editJob,getAllJob,getFilterJob,getJobDetails} = require("../controller/job.controller")
const verifyUser = require("../middleware/verifyUser")

route.get("/",getAllJob)
route.get("/filter",getFilterJob)
route.get("/details/:id",getJobDetails)
route.post("/add",verifyUser,addJob)
route.put("/edit/:id",verifyUser,editJob)

module.exports = route;