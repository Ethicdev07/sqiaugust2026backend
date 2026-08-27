const express = require("express");

const router = express.Router();

const {register, getAllUsers} = require("../controllers/authController");


router.post("/register",  register);

router.get("/getallusers", getAllUsers);



module.exports = router;

