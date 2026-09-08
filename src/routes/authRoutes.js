const express = require('express');

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/verify/:email/:verificationToken").get(authController.verifyEmailAddress);

router.route("/forgotpassword").post(authController.forgetPassword);

router.route("/forgetpassword/:email/:resetToken").get(authController.verifyResetToken);
router.route("/resetpassword/:email/:resetToken").patch(authController.resetPassword);

module.exports = router;