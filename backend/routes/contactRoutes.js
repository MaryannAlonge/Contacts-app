const express = require('express');
const { 
  getContact, 
  createContact, 
  updateContact, 
  deleteContact, 
  getContacts 
} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

// require express router
const router = express.Router();

router.use(validateToken)

router.route('/').get(getContacts);

router.route('/').post (createContact);

router.route('/:id').get (getContact);


router.route('/:id').put (updateContact);

router.route('/:id').delete (deleteContact);

module.exports = router;