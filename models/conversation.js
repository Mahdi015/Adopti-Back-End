const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ConversationSchema = mongoose.Schema(
  {
    chatUsers: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
