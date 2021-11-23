const express = require("express");
const router = express.Router();

module.exports = router;

// Controller
const {
  checkConversation,
  createConversation,
} = require("../controllers/conversation");

// MiddleWares
const { authCheck } = require("../middlewares/auth");
//Routes
router.post("/chat/checkConversation", checkConversation);
router.post("/chat/createConversation", createConversation);
