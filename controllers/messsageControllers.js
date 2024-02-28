const Message = require("../models/messsageModel");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const GMAIL = process.env.GMAIL;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

const createMessage = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    // Create a new message instance with current date
    const newMessage = new Message({
      fullName,
      email,
      subject,
      message,
      createdAt: Date.now(), // Include current date and time
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a list of all messages
const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const replyMessage = async (req, res) => {
  const { email } = req.body;
  try {
    console.log(GMAIL, GMAIL_PASSWORD);
    let config = {
      service: "gmail",
      auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "NTEZIRYAY Celestin",
        intro: "We have received your message and we will get to yo asap!",
        body: "You will be receiving the updates every time there is new atricle posted",
        outro: "Looking forward to do more business",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: GMAIL,
      to: email,
      subject: "Repy to your Message to Celestin",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "Reply has been sent successfully",
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  replyMessage,
};
