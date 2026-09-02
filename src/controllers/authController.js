const Users = require("../models/User");
const {
  validationUserSignup,
  validationUserLogin,
} = require("../validation/usersValidation");
const signJwt = require("../utils/signJWT");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

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

    //Send mail verification

    const options = {
      email: email,
      subject:
        "Welcome to SQI AUGUST Ecommerce platform, where product price get better",
      message:
        "Welcome onboard. We are pleased to have you. Shop Now, get better price.",
    };

    await sendEmail(options);

    //Create verification token

    const verificationToken = crypto.randomBytes(32).toString("hex");

    //hash verification token

    const hashedVerficationToken = await bcrypt.hash(verificationToken, salt);

    //create verificationUrl

    const verificationUrl = `${req.protocol}://${req.get(
      "host",
    )}/api/v1/auth/verify/${user.email}/${verificationToken}`;

    //create verification message

    const verificationMessage = `Please click on the verification link to verify your email. \n ${verificationUrl}`;

    const verificationMailOptions = {
      email: email,
      subject: "Verify your email address",
      message: verificationMessage,
    };

    await sendEmail(verificationMailOptions);

    user.verification_token = hashedVerficationToken;

    await user.save();

    const token = signJwt(user._id);

    res.status(201).json({
      status: "succesful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};


const verifyEmailAddress = async (req, res, next)=>{
  try {

    const {email, verificationToken} = req.params;

    if(!email || !verificationToken){
      throw new AppError("Please provide email and token");
    }

    //check if email exist

    const user = await Users.findOne({ email });

    if(!user){
      throw new AppError("User Not Found!")
    };

    const tokenValid = await bcrypt.compare(verificationToken, user.verification_token);

    if(!tokenValid){
      throw new AppError("Failed to verify user - Invalid token")
    }


    user.email_verified = true;

    await user.save();

    res.status(201).json({
      status: "successful",
      message: 'User verified succesfully',
      data: {
        user,
      }
    })
    
    
  } catch (error) {
    next(error)
  }
}


//Write login controller function, users must have been verified before they can login
module.exports = { signUp, verifyEmailAddress };
