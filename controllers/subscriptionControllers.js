const Subscription = require('../models/subscriptionModel');
const nodemailer = require('nodemailer');

async function subscribe(req, res) {
    const { email } = req.body;
    try {
        const newSubscription = await Subscription.create({ email });

        // // Send confirmation email
        // const transporter = nodemailer.createTransport({
        //     // Configure your mail settings here
        // });

        // const mailOptions = {
        //     from: 'your_email@gmail.com',
        //     to: email,
        //     subject: 'Subscription Confirmation',
        //     text: 'You have successfully subscribed to our newsletter.'
        // };

        // await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { subscribe };
