const Conversation = require("../models/conversation");

exports.checkConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const findSecConversation = await Conversation.findOne({
      $and: [
        { chatUsers: { $in: [senderId] } },
        { chatUsers: { $in: [receiverId] } },
      ],
    }).exec();
    if (findSecConversation) {
      res.json(findSecConversation);
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const newCenversation = await new Conversation({
      chatUsers: [senderId, receiverId],
    }).save();
    res.json(newCenversation);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};
