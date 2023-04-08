const asyncHandler = require("express-async-handler");

//@desc Register a User
//@route POST /user/register
//@access public

const registerUser = asyncHandler (async (req, res) => {
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