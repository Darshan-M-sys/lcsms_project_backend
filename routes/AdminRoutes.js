const express=  require("express");
const adminRouter = express.Router();

const { AdminLogin } = require("../controllers/AdminLoginController");
const { addTechnician, updateTechnician } = require("../controllers/adminControllers/addTechnicianController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdminMiddleware");
const { getAllTechnicians, getSingleTechnicians, deleteTechnician } = require("../controllers/adminControllers/getAllTechnicianController");
const { getAllRequests, getRequestById, handleAssignTechnician, updateRequestStatus, addMessages, deleteRequest } = require("../controllers/adminControllers/requestsController");
const { createBill, getBill, updateBillStatus } = require("../controllers/CreateBillController");
const { getAllCustomer, deleteCustomer } = require("../controllers/getAllCustomer");
const { getAdminStats } = require("../controllers/adminControllers/stats");

adminRouter.post("/login",AdminLogin);
// add technician
adminRouter.post("/add/technician",isAuthenticated,isAdmin,addTechnician);
adminRouter.get("/all/technicians",isAuthenticated,isAdmin,getAllTechnicians);
adminRouter.get("/single/technicians/:technicianId",isAuthenticated,isAdmin,getSingleTechnicians);
adminRouter.put("/update/technicians/:id",isAuthenticated,isAdmin,updateTechnician);
adminRouter.delete("/delete/technicians/:id",isAuthenticated,isAdmin,deleteTechnician);

// requests
adminRouter.get("/all/requests",isAuthenticated,isAdmin,getAllRequests);
adminRouter.get("/single/requests/:id",isAuthenticated,isAdmin,getRequestById);
adminRouter.put("/assign/technician/:requestId",isAuthenticated,isAdmin,handleAssignTechnician);
adminRouter.put("/status/update/:requestId",isAuthenticated,isAdmin,updateRequestStatus);
adminRouter.delete("/delete/request/:requestId",isAuthenticated,isAdmin,deleteRequest);
adminRouter.put("/add/message/:id",isAuthenticated,addMessages);
// bill
adminRouter.post("/create/bill/:requestId",isAuthenticated, isAdmin,createBill);
adminRouter.get("/get/bill/:requestId",isAuthenticated, isAdmin,getBill);
adminRouter.put("/status/bill/:id",isAuthenticated,isAdmin,updateBillStatus);
adminRouter.get("/stats",isAuthenticated,isAdmin,getAdminStats);

// customers
adminRouter.get("/get/all/customer",isAuthenticated,isAdmin,getAllCustomer);
adminRouter.delete("/delete/customer/:customerId",isAuthenticated,isAdmin,deleteCustomer);

module.exports = adminRouter

