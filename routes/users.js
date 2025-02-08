var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.post('/add-guests', userController.addGuests);

module.exports = router;
