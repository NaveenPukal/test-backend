const ContactForm = require("../models/contactform.model");

const nodemailer = require("nodemailer");

exports.form_create = function (req, res, next) {
  const data = req.body;

  let contact_form = new ContactForm({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  const gmail_usr = process.env.GMAIL_USERNAME;
  const gmail_pass = process.env.GMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    
    service: "gmail",
    auth: {
      user: `${gmail_usr}`,
      pass: `${gmail_pass}`,
    },
  });

  const mailOptions = {
    from: "pukalnaveen98@gmail.com",
    to: "pukalnaveen98@gmail.com,nagapandian619@gmail.com",
    subject: "Candidate Details",
    html: `
        <div style="background-color:white;">
        <h3 style="color:orange">SZIGONY TECHNOLOGIES<h3/>
         <hr>
         <br>
         <h5 style="color:black" >Name: ${data.name}<h5/>
    
            <h5 style="color:black" >Email: ${data.email}<h5/>
     
            <h5 style="color:black" >Subject: ${data.subject}<h5/>
    
            <h5 style="color:black" >Message: ${data.message}<h5/>
          
           
            </div>
         
            </div>
            `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent:${info.response}`);
    }
  });

  transporter.close();
  contact_form.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("message send successfully");
  });
};
