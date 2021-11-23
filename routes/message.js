const express = require("express");
const router = express.Router();

module.exports = router;
// Controller
const {
  createMessage,
  getMessage,
  getSenderImg,
} = require("../controllers/message");

// MiddleWares
const { authCheck } = require("../middlewares/auth");
//Routes
router.post("/chat/createMessage", createMessage);
router.post("/chat/getMessage/:conversationId", getMessage);
router.get("/chat/getSenderImg/:senderId", getSenderImg);
