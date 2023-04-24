const express = require('express');
const mainController = require('../controllers/mainController'); 

const router = express.Router();

//route to the index file
router.get('/', mainController.index);

//route to about us page
router.get('/about', mainController.about);

//route to contact us page
router.get('/contact', mainController.contact);

module.exports = router;