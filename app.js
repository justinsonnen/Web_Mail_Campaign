const http = require('http');

//node modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = process.env.PORT || 3000;
const MC_ID = process.env.MAILCHIMP_LIST_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;



const app = express();

// serve static files via express
app.use(express.static("public"));

// bodyparser middleware, for parsing user inputs
app.use(bodyParser.urlencoded({
  extended: true
}));


//points to signup page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//grab user input form data
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  //mailchimp data object, not yet stringified
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  //flatpak json data object
  var jsonData = JSON.stringify(data);

  //mailchimp url, including list ID
  const url = "https://us2.api.mailchimp.com/3.0/lists/" + MC_ID;

  //mailchimp key
  const options = {
    method: "POST",
    auth: "justin:" + API_KEY
  }

  //https request options
  const request = https.request(url, options, function (response) {

    //response redirect to confirm outcome of submitted form
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/fail.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/fail", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server is running on port: 3000");
});
