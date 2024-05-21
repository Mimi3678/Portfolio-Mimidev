const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { Name, Email, Message } = JSON.parse(event.body);

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Setup email data
    let mailOptions = {
        from: Email,
        to: 'miriamsarpong25@gmail.com',
        subject: 'New form submission',
        text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'Thanks for getting in touch!'
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.toString()}`
        };
    }
};
