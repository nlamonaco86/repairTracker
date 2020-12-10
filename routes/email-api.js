// Require models and passport
require('dotenv').config();
const db = require("../models");
// nodemailer module
const nodemailer = require('nodemailer');
const email = require('../config/email');



//configuration, will be moved to the emailConfig file in /config and exported once fully implemented
let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = function (app) {

    // const getOneOrder = (searchId) => {
    //     return db.Order.findOne({
    //         where: { id: searchId },
    //         include: [
    //             { model: db.Customer, attributes: ['id', 'firstName', 'lastName', 'tel', 'email', 'addr1', 'addr2', 'city', 'state', 'zip'] }
    //         ]
    //     })
    // }

    app.get("/api/email/invoice/:id", function (req, res) {
        // grab the invoice data from the ORM
        order.one(req.params.id, (data) => {
            // plug it into the invoice template email
            // email.marketing(data[0].customerId)
            //     // Send the restult to its destination
            //     .then(result => {
                    res.json(result)
            //     })
        })
        // .then(result => {
        //     res.json({message: result.id})

        //     // if (result === null) { res.json({ error: "No Results Found! Please try again" }) }
        //     // else {
        //     //     // create an e-mail to send to the customer
        //     //     let mailOptions = {
        //     //         from: process.env.EMAIL_USERNAME,
        //     //         // use the customer's email addresses to send the email
        //     //         // to: result.Customer.email,
        //     //         //for testing purposes:
        //     //         // to: 'nlamonaco86@gmail.com',
        //     //         subject: `repairTracker: Invoice #${result.id}`,
        //     //         // Textbox can contain HTML using template literal/inline styling 
        //     //         text: "Under Development"
        //     //         // html: variable
        //     //     };
        //     //     // send the e-mail to the customer 
        //     //     transporter.sendMail(mailOptions, function (error, info) {
        //     //         // error handling
        //     //         (error ? console.log(error) : console.log('Email sent: ' + info.response))
        //     //     })
        //     //     // email is successfuly sent, end the connection
        //     //     res.send("success")    
        //     // }
        // });
    });

};