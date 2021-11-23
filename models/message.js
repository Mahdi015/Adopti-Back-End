const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const MessageSchema = mongoose.Schema(
  {
    conversationId: { type: ObjectId, ref: "Conversation" },
    senderId: { type: ObjectId, ref: "User" },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", MessageSchema);
