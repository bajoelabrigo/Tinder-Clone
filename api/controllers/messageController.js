import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log("Error in 'sendMessage", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort("createdAt");
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Error in 'getConversations", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
