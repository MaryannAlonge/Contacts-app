const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;


// adding midlleware
app.use(express.json());
// endpoint for contacts
app.use("/api/contacts", require("./routes/contactRoutes"));
//endpoint for users
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}!!!`) 
  
})