const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();


router.route("/getallusers").get(userController.getAllUsers);

router.route("/profile").get(authMiddleware.protectRoute, userController.getUserProfile);

router.route("/updatepassword").patch(authMiddleware.protectRoute, userController.updatePassword)



module.exports = router;