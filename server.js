var express=require('express');
var nodemailer = require("nodemailer");
var path = require('path');
var sgTransport = require('nodemailer-sendgrid-transport');
var app=express();
require('dotenv').config({ path: 'variables.env' });

var transport = nodemailer.createTransport(sgTransport({
  auth: {
    api_user: process.env.MAIL_USER,
    api_key: process.env.MAIL_PASS
  }
}));

app.use(express.static(path.join(__dirname, '/')));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.post('/send',function(req,res){
  var mailOptions={
    to: 'ClaytonAlanKinder@gmail.com',
    from: 'message@claytonkinder.com',
    subject: `Message from ${req.query.name} at ${req.query.address}`,
    text: req.query.message
  }
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      sent = false;
      errMsg = error.message;
    } else {
      sent = true;
      errMsg = 'Error free!';
    }
    return res.json({
      messageSent: sent,
      errorMessage: errMsg
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Started!");
});
