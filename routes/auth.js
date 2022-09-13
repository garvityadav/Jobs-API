const express = require('express');
const router = express.Router();
const {allUsers ,login , register} = require('../controllers/auth');

router.route('/allUsers').get(allUsers);
router.route('/login').post(login);
router.route('/register').post(register);

module.exports =  router;