const nodemailer = require('nodemailer');
const Property = require('../model/property');
const User = require('../model/user');
const Inspection = require('../model/inspection');

exports.send = async (req, res) => {
  const property = await Property.findById(req.body.id).exec();
  const user = await User.findById(property.user.toString()).exec();
  const output = `
    <p>You have a new contact request from Real Rental</p>
    <h3>New Enquiry for ${req.body.address}</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        ${req.body.phone ? `<li>Phone: ${req.body.phone}</li>` : ''}
        ${req.body.isAvailableDate ? `<li>Enquiry: what's the available date?</li>` : ''}
        ${req.body.isLengthOfLease ? `<li>Enquiry: what's the length of lease?</li>` : ''}
        ${req.body.isInspection ? `<li>Enquiry: I'd like to inspect the property please.</li>` : ''}
        ${req.body.isRentalApplication ? `<li>Enquiry: How can I apply?</li>` : ''}
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <p>New Enquiry for${req.body.address}</p>
`;

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: '"Ready Rental" <buggodie@gmail.com>',
      to: user.email,
      subject: `New Enquiry for ${req.body.address}`,
      text: 'You have a new contact request from Real Rental',
      html: output,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log('Message sent: %s', info.messageId);
    });
  });

  const contactUser = req.body.contactUser;
  if (contactUser) {
    const inspection = new Inspection({
      user: contactUser._id,
      property: property,
    });
    await inspection.save();
    const user = await User.findById(contactUser._id).exec();
    user.inspections.addToSet(inspection._id);
    await user.save();
    return res.status(201).json({ inspection, user });
  }
};
