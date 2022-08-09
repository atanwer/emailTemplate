const express = require('express');
const nodemailer = require('nodemailer');
const fs = require("fs")
const ejs = require("ejs")
const app = express();
const port = 3000;

const emailDetails = {
    recipients: ["Anuj"],
    requesterName: "Anuj Dubey",
    requestName: "Document collection from jgapuz",
    sender: "empowerwealth@gmail.com",

}

// Set EJS as templating engine
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('test', { emailDetails });
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'akalesh.aurasoft@gmail.com',
        pass: 'yewyvtjcmljrszzo'
    }
});


let mainOptions = {}
// fs.readFile('index.html', 'utf8', function (err, data) {
ejs.renderFile('views/test.ejs', { emailDetails }, function (err, data) {
    if (err) {
        return console.log(err);
    }
    mainOptions = {
        from: '"Tester" akalesh.aurasoft@gmail.com',
        to: "akalesh.aurasoft@gmail.com",
        subject: 'Email Template',
        attachments: [
            {
                filename: 'righ_header_logo.png',
                path: 'public/righ_header_logo.png',
                cid: 'righ_header_logo'
            }, {
                filename: 'exclamation.png',
                path: 'public/exclamation.png',
                cid: 'exclamation'
            }
        ],
        html: data
    };
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});