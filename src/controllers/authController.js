const Users = require("../models/User");
const {
  validationUserSignup,
  validationUserLogin,
} = require("../validation/usersValidation");
const signJwt = require("../utils/signJWT");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const { model } = require("mongoose");

const signUp = async (req, res, next) => {
  try {
    const validation = validationUserSignup(req.body);

    if (validation.error) {
      throw new AppError(validation?.error.message, 400);
    }

    const { firstname, lastname, email, password } = req.body;

    //check if user already exist

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      throw new AppError("User with email already exist");
    }

    //Hashing of password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

    //create user

    const user = await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError("Failed to create user");
    }

    await user.save();

    const token = signJwt(user._id);

    res.status(201).json({
      status: 'succesful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      status: 'Failed',
      message: error.message
    })
  }
};



module.exports = {signUp};