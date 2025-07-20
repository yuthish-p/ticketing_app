const express = require("express");
const router = express.Router();
const authRouter = require("./Auth");
const ticketRouter = require("./Ticket");

router.use("/auth", authRouter);
router.use("/", ticketRouter);

module.exports = router;