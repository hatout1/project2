const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8500;
const logger = require("morgan");

var moment = require("moment");
moment().format();

require("dotenv").config();

// let apiKey = process.env.apiKey;
// let authDomain = process.env.authDomain;
// let databaseURL = process.env.databaseURL;
// let projectId = process.env.projectId;
// let storageBucket = process.env.storageBucket;
// let messagingSenderId = process.env.messagingSenderId;
// let appId = process.env.appId;

const firebase = require("firebase");
const firebaseConfig = {
  // apiKey,
  // authDomain,
  // databaseURL,
  // projectId,
  // storageBucket,
  // messagingSenderId,
  // appId,
  apiKey: "AIzaSyC6LftGH4U7pUjhGWuIaS4jrd9lDErvT4E",
  authDomain: "project2-e02f7.firebaseapp.com",
  databaseURL: "https://project2-e02f7.firebaseio.com",
  projectId: "project2-e02f7",
  storageBucket: "project2-e02f7.appspot.com",
  messagingSenderId: "1006019730458",
  appId: "1:1006019730458:web:fc321e0b803f211dad85a3",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.firestore();
// const dbase = database;
// const admin = require('firebase-admin');
// const serviceAccount = require('./project2-e02f7-firebase-adminsdk-z4pbd-b9a5d004e1.json')
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// })
// const Fdbase = admin.firestore();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.set("public", __dirname + "/public");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));

const apiRoutes = require("./routes/api/apiRoutes");
app.use("/api/user", apiRoutes);

const recipeRoutes = require("./routes/api/recipeRoutes");
app.use("/api/recipe", recipeRoutes);

const clientRoutes = require("./routes/client/htmlRoutes");
app.use("/", clientRoutes);

const commentRoutes = require("./routes/api/commentsRoutes");
app.use("/api/comment", commentRoutes);

const shoppingListRoutes = require("./routes/api/shoppingListRoutes");
app.use("/api/shopping", shoppingListRoutes);

const favoriteRoutes = require("./routes/api/favoriteRoutes");
app.use("/api/favorite", favoriteRoutes);

let email = "";
let password = "";

// sign up new users
app.post("/SignUp", (req, res) => {
  email = req.body.email;
  password = req.body.password;
  username = req.body.username;
  diet = req.body.diet;
  zipcode = req.body.zipcode;
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    database
      .collection("users")
      .doc(cred.user.uid)
      .set({
        username,
        diet,
        email,
        password,
        zipcode,
      })
      .then(() => {
        db.Users.create({
          UserId: cred.user.uid,
          username,
          diet,
          email,
          password,
          zipcode,
        }).then((result) => {
          res.json(result);
        });
      });
  });
});

// sign in existing user
app.post("/home", (req, res) => {
  email = req.body.email;
  password = req.body.password;
  auth.signInWithEmailAndPassword(email, password);
  res.send(auth);
});

// sign out singed in user
app.post("/signout", (req, res) => {
  auth.signOut();
  res.send(auth);
});

app.get("/status", (req, res) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      res.send(user);

      console.log("signed in");
      app.set("public", __dirname + "/public");
    } else {
      console.log("No user is signed in.");
    }
  });
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening: http://localhost:${PORT}`);
  });
});
