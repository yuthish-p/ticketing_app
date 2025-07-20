const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/Auth");

router.post("/", authController.Auth);

module.exports = router;