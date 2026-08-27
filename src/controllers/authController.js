const users = require("../models/User");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "Bad request",
      message: "Please provide name, email and password",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exist, use a different email.",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    status: "Successful",
    message: "Account created successfully",
    user: newUser,
  });
};

//write the function to getAllUsers

const getAllUsers = (req, res)=>{
    res.status(200).json({
        message: 'all users fetched succesfully',
        allUser: users
    })
}

module.exports = {register, getAllUsers};
