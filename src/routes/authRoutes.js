const express = require('express');

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

router.route("/signup").post(authController.signUp)




module.exports = router;