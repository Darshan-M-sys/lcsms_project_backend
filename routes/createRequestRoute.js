const express = require("express");
const createRequestRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");


const {
  createRequest,
  getMyRequests,
  getRequestById,
} = require("../controllers/ServiceRequestService");
const { upload } = require("../middlewares/ImageUploadMiddleware");
const { addMessages, deleteRequest } = require("../controllers/adminControllers/requestsController");
const isCustomer = require("../middlewares/isCustomer");
const { getBill } = require("../controllers/CreateBillController");

// 🔥 CREATE SERVICE REQUEST
createRequestRouter.post(
  "/create",
  isAuthenticated,
  upload.array("images", 5),
  createRequest
);
createRequestRouter.get(
  "/my/requests",
  isAuthenticated,
 getMyRequests
);
createRequestRouter.get(
  "/my/requests/:id",
  isAuthenticated,
 getRequestById
);
createRequestRouter.get(
  "/get/bill/:requestId",
  isAuthenticated,isCustomer,
 getBill
);

createRequestRouter.delete(
  "/delete/request/:requestId",
  isAuthenticated,isCustomer,
 deleteRequest
);


module.exports = createRequestRouter;
upload