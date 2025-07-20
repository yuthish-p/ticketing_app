const express = require("express");
const router = express.Router();
const authController = require("../../Controllers/Auth");
const ticketController = require("../../Controllers/Ticket");

router.get("/ticket",ticketController.list);
router.post("/ticket",ticketController.create);
router.post("/ticket/:id",ticketController.nextStatus);


module.exports = router;