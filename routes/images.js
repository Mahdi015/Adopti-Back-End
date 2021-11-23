const express = require("express")
const router = express.Router();


// Controller
const {upload, remove} = require('../controllers/images');


// MiddleWares
const { authCheck} = require("../middlewares/auth");


router.post('/uploadimages',authCheck,upload)
router.post('/removeimage',authCheck,remove)

module.exports=router