const Message = require("../models/message");
const User = require("../models/user");
const Conversation = require("../models/conversation");
exports.createMessage = async (req, res) => {
  try {
    const newMessage = await new Message(req.body).save();
    res.json(newMessage);
    console.log(newMessage);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const findMesages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(findMesages);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.getSenderImg = async (req, res) => {
  try {
    const findSenderImg = await User.findById(req.params.senderId);
    res.json(findSenderImg);
    console.log(findSenderImg);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};
