const express = require("express");
const router = express.Router();

const { signin, signup } = require("../controllers/users");

router.post("/signin", signin); // email, password
router.post("/signup", signup); // firstName, lastName, email, password

module.exports = router;