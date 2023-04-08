const express = require('express');
const { getContact, createContact, updateContact, deleteContact, getContacts } = require("../controllers/contactController");

// require express router
const router = express.Router();

router.route('/').get(getContacts);

router.route('/').post (createContact);

router.route('/:id').get (getContact);


router.route('/:id').put (updateContact);

router.route('/:id').delete (deleteContact);

module.exports = router;