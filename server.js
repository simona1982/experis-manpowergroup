/* eslint-disable no-param-reassign */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

const USER_DATA_FILE = path.join(__dirname, "server-user-data.json");
const INTERVIEW_DATA_FILE = path.join(__dirname, "server-interview-data.json");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Routes
app.post("/login", (req, res) => {
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);

    let userExists = false;

    users.users.map(user => {
      if (
        user.email === req.body.email &&
        user.password === req.body.password
      ) {
        userExists = true;
      }
    });

    if (userExists) {
      return res.json({ status: "Ok", message: "Authenticated Successfully" });
    } else {
      return res.json({
        status: "Error",
        message: "Invalid Authentication Credentials"
      });
    }
  });
});

app.post("/save-data-interview", (req, res) => {
  fs.readFile(INTERVIEW_DATA_FILE, (err, data) => {
    const interviews = JSON.parse(data);
    //console.log(interviews);

    //New interview
    const newInterview = req.body;
    console.log(newInterview);

    let interviewCrosses = false;

    interviews.interviews.map(u => {
      if (
        u.interview.date === newInterview.interview.date &&
        u.interview.time === newInterview.interview.time
      ) {
        //cartProduct.quantity++;
        interviewCrosses = true;
      }
    });

    //console.log(interviewCrosses);

    if (!interviewCrosses) {
      interviews.interviews.push(newInterview);
    }

    fs.writeFile(
      INTERVIEW_DATA_FILE,
      JSON.stringify(interviews, null, 4),
      () => {
        res.setHeader("Cache-Control", "no-cache");
        res.json(interviews);
      }
    );
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
