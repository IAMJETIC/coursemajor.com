const express = require("express");
const privateRouter = express.Router();
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/userAuthorize");

privateRouter.get("/", protect, getPrivateData);

module.exports = privateRouter;