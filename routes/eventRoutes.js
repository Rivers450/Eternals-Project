const express = require('express');
const router = express.Router();

const controller = require('../controllers/eventController');
const { fileUpload } = require('../middleware/fileUpload');
const { isLoggedIn, isHost, isGuest } = require('../middleware/auth');
const { validateId, validateEvent, validateResult, getDateInputs, validateRSVP } = require('../middleware/validator');

router.get('/', controller.index);
router.get('/new', isLoggedIn, controller.new);
router.post('/', isLoggedIn, fileUpload, getDateInputs, validateEvent, validateResult, controller.create);
router.get('/:id', validateId, controller.show);
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);
router.put('/:id', validateId, isLoggedIn, isHost, fileUpload, getDateInputs, validateEvent, validateResult, controller.update);
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);
router.post('/:id/rsvp', validateId, isLoggedIn, isGuest, validateRSVP, validateResult, controller.rsvp)

module.exports = router;