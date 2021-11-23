const express = require("express")
const router = express.Router();

// Controller
const { currentuser} = require('../controllers/auth');


// MiddleWares
const { authCheck , admincheck} = require("../middlewares/auth");
router.post('/CurrentUSer',authCheck,currentuser);
router.post('/Currentadmin',authCheck,admincheck,currentuser);

module.exports = router;