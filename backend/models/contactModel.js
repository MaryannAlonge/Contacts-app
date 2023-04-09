const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  
    // adding the userId of user creating contact
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User,"
    },
  
  name:{
    type: String,
    required: [true, "Please add the contact name"],
  },
  email : {
    type: String,
    required: [true, "Please add the contact email address"],
  },
  phone : {
    type: String,
    required: [true, "Please add the contact phone number"],
  },
}, {
  // time stamp
    timeStamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);