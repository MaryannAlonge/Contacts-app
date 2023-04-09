const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
  // set a token variable
  let token;
  // create instances of user auth types
  let authHeader = req.headers.Authorization || req.headers.authorization;
  // compare header and bearer
  if(authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    // verify if token is valid by passing token and access key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
      if (err) {
        res.status(401)
        throw new Error("User is not authorized")
      }
    })
  }
})