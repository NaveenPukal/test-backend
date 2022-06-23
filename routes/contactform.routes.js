const express = require("express");
const router = express.Router();
const contactform_controller = require("../controllers/contactform.controller");

router.post("/api/contactform", contactform_controller.form_create);
module.exports = router;
