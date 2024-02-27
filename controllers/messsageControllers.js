const Message = require('../models/messsageModel')

const createMessage = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        
        // Create a new message instance with current date
        const newMessage = new Message({
          fullName,
          email,
          subject,
          message,
          createdAt: Date.now() // Include current date and time
        });
    
        // Save the message to the database
        await newMessage.save();
    
        res.status(201).json({ message: 'Message sent successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// Controller for getting a list of all messages
const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const replyMessage = async (req, res) => {

}


module.exports = {
    createMessage,
    getAllMessages,
    replyMessage
}