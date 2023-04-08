const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//@desc Register a User
//@route POST /user/register
//@access public

const registerUser = asyncHandler (async (req, res) => {
  const {username, email, password} = req.body;
  if (!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory")
  }
  const userAvailable = await User.findOne({email});
  if(userAvailable) {
    res.status(400);
    throw new Error("User already registered!")
  }

// Hash password
const hashedPassword = await bcrypt.hash(password, 10); // pass in the raw password from the req.body
console.log("Hashed password", hashedPassword)
const user = await User.create({
  username,
  email,
  password: hashedPassword,
});

console.log(`User created ${user}`)
  res.json({message: "Register the user"});
});


//@desc Login a User
//@route POST /user/login
//@access public

const loginUser = asyncHandler (async(req, res) => {
  res.json({message: "Login the user"});
});


//@desc Get User Information
//@route GET /user/current
//@access private

const currentUser = asyncHandler (async  (req, res) => {
  res.json({message: "Current User Information"});
});

module.exports = {
registerUser,
loginUser,
currentUser
}