const express= require("express");
const isTechnician = require("../middlewares/isTechnician");
const { getAllAssignedRequests } = require("../controllers/technicianController/AssignedRequests");
const isAuthenticated= require("../middlewares/isAuthenticated");
const { getRequestById } = require("../controllers/adminControllers/requestsController");
const technicianRouter= express.Router();

technicianRouter.get("/get/all/assigned/requests",isAuthenticated,isTechnician,getAllAssignedRequests)
technicianRouter.get("/get/request/:id",isAuthenticated,isTechnician,getRequestById)
module.exports=technicianRouter