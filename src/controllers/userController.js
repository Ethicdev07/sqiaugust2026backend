const Users = require("../models/User");
const AppError = require('../utils/AppError');

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
}

module.exports = {getAllUsers, getUserProfile}