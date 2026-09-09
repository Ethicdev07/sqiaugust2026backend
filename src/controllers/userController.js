const Users = require("../models/User");
const AppError = require('../utils/AppError');
const bcrypt = require("bcryptjs")

//get all users
const getAllUsers = async(req, res, next)=>{
    try {

        const users = await Users.find();

        if(!users){
            throw new AppError("No users found", 404)
        };

        res.status(200).json({
            status: "success",
            message: "all users fetched successfully",
            data: {
                users,
            }
        })
        
    } catch (error) {
        next(error)
    }
};

//get user profile
const getUserProfile = async(req, res, next)=>{
    const userId = req.user._id;
    try {
        const user = await Users.findById(userId);

        if(!user){
            throw new AppError(`Users with ${id} not found`, 404)
        }
        
        const fullname = user.getFullName();

        res.status(200).json({
            status: "success",
            message: "user retrieved successfully",
            data: {
                user,
                fullname
            }
        })
    } catch (error) {
        next(error)
    }
};


//update userpassword

const updatePassword = async(req, res, next)=>{
    try {
        
        const userId = req.user._id;

        const user = await Users.findById(userId).select("+password");

        if(!user){
            throw new AppError("User not found with id", 404)
        }

        const {oldPassword, newPassword, confirmPassword} = req.body;

        if(!oldPassword || !newPassword || !confirmPassword){
            throw new AppError("Please provide old password and new password", 400)
        };

        const ispasswordValid = await user.comparePassword(
            oldPassword,
            user.password
        );

        if(!ispasswordValid){
            throw new AppError("Old password is incorrect", 400)
        };

        if(oldPassword === newPassword){
            throw new AppError("New password cannot be same as old password", 400)
        };

        if(newPassword !== confirmPassword){
            throw new AppError("New password and confirm password does not match", 400)
        };

        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            status: "success",
            message: "password updated successfully",
            data: {
                user,
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers, 
    getUserProfile,
    updatePassword
}