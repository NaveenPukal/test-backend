const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer");
const JobForm = require("../models/jobform.model");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./resumes");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

async function insetData(req, res, next) {
  let job_form = new JobForm({
    Fname: req.body.Fname,
    Lname: req.body.Lname,

    Email: req.body.Email,
    Role: req.body.Role,
    Number: req.body.Number,
    Address: req.body.Address,
    File: req.files[0].filename,
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
    from: "info@szigonytech.com",
    to: "nagapandian619@gmail.com,pukalnaveen98@gmail.com",
    subject: `Application for ${req.body.Role}`,
    attachments: [
      {
        filename: req.files[0].filename,
        contentType: "application/pdf",
        path: req.files[0].path,
      },
    ],
    html: `
         
          <h3 style="color:orange">SZIGONY TECHNOLOGIES<h3/>
           <hr>
           <br>
           <h5 style="color:black" >First Name: ${req.body.Fname}<h5/>
      
              <h5 style="color:black" >Last Name: ${req.body.Lname}<h5/>

              <h5 style="color:black" >Role: ${req.body.Role}<h5/>
       
              <h5 style="color:black" >Email: ${req.body.Email}<h5/>
      
              <h5 style="color:black" >Mobile Number: ${req.body.Number}<h5/>

              <h5 style="color:black" >Address: ${req.body.Address}<h5/>

              <h5 style="color:black" >Resume: <h5/>
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

  job_form.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("message send successfully");
  });
}

router.post("/api/resumes-details", upload.any(), async (req, res, next) => {
  insetData(req, res, next);
});

module.exports = router;
