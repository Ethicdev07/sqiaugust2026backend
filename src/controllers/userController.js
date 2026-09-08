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
}

module.exports = {getAllUsers}