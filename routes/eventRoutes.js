const express = require('express');
const { fileUpload } = require('../middleware/fileUpload');
const controller = require('../controllers/eventController');
const { isLoggedIn, isHost } = require('../middleware/auth');
const { validateId } = require('../middleware/validator');

const router = express.Router();

router.get('/', controller.index);
router.get('/new', isLoggedIn, controller.new);
router.post('/', isLoggedIn, fileUpload, controller.create);
router.get('/:id', validateId, controller.show);
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);
router.put('/:id', validateId, isLoggedIn, isHost, fileUpload, controller.update);
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

//exporting the router
module.exports = router;