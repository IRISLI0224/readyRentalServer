const nodemailer = require('nodemailer');
const Inspection = require('../model/inspection');
const User = require('../model/user');

exports.send = async(req, res) => {
    const output = `
    <p>You have a new contact request from Real Rental</p>
    <h3>New Enquiry for ${req.body.address}</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        ${req.body.phone ? `<li>Phone: ${req.body.phone}</li>` : ''}
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <p>${req.body.address}</p>
    <p>${req.body.id}</p>
`;
   console.log(output);
  


}

