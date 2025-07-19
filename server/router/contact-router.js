const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-controller");


router.route("/contactForm").post(contactController.contactForm);

module.exports = router;