const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access public

 const getContacts = asyncHandler (async (req, res) => {
  // establish communication with DB using .find()
  const contacts = await Contact.find({user_id: req.user.id})
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
 const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const {name, email, phone} = req.body;
  if(!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  // if we have all the above and they're not empty, create contact using .create()
  const contact = await Contact.create({
    name,
    email,
    phone,
    // including the user id of who's creating the contact
    user_id: req.user.id
  })
  res.status(201).json(contact);
});

//@desc Get ONE contact
//@route GET /api/contacts/:id
//@access private
 const getContact = asyncHandler(async (req, res) => {
  // find a single contact using the .findById() method
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
 const updateContact = asyncHandler(async (req, res) => {
  // to update a contact we must first fetch the contact
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact not found");
  }
// making sure users are only updating contacts created by them
  if(contact.user_id.toString() == req.user.id) {
    res.status(403);
    throw new Error("You do not have permission to update other users' contacts")
  }
   // update contact using the .findByIdandUpdate method
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    // set the "new" query option as true
    { new: true}
    );
  res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
 const deleteContact = asyncHandler(async (req, res) => {
  // to delte a contact we must first fetch the contact
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact not found");
  }

  //delete contact using the .remove() method
 await Contact.remove()
  res.status(200).json(contact);
});




module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
}