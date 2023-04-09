const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

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
// when user is created
if(user){
  res.status(201).json({_id: user.id, email: user.email});
} else{
  res.status(400)
  throw new Error("User data was not valid");
}
  res.json({message: "Register the user"});
});


//@desc Login a User
//@route POST /user/login
//@access public

const loginUser = asyncHandler (async(req, res) => {
  const { email, password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("All fields are mandatory!")
  }
  // find user in database
  const user = await User.findOne({email});
  // compare password with hashedPassword
  if(user && (await bcrypt.compare(password, user.password))) {
    // create instance of accessToken
    const accessToken = jwt.sign({
      // specify things you want as payload in the token
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
      // provide accessToken seecret
    }, process.env.ACCESS_TOKEN_SECRET,
    // set expiration time for token
    {expiresIn: "1m"}
    );
    res.status(200).json({accessToken});
  } else {
    res.status(401)
    throw new Error("Invalid credentials")

  }
});


//@desc Get User Information
//@route GET /user/current
//@access private

const currentUser = asyncHandler (async  (req, res) => {
  res.json(req.user);
});

module.exports = {
registerUser,
loginUser,
currentUser
}