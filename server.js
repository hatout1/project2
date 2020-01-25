const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8500;
var moment = require('moment');
moment().format();

require('dotenv').config();

const firebase = require('firebase');
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "project2-e02f7.firebaseapp.com",
    databaseURL: "https://project2-e02f7.firebaseio.com",
    projectId: "project2-e02f7",
    storageBucket: "project2-e02f7.appspot.com",
    messagingSenderId: "1006019730458",
    appId: "1:1006019730458:web:fc321e0b803f211dad85a3"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
// const dbase = database;
const admin = require('firebase-admin');
const serviceAccount = require('./project2-e02f7-firebase-adminsdk-z4pbd-b9a5d004e1.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const Fdbase = admin.firestore();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
// app.set('public', __dirname + '/public');

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
app.post('/SignUp', (req, res) => {
    email = req.body.email;
    password = req.body.password;
    username = req.body.username;
    diet = req.body.diet;
    zipcode = req.body.zipcode;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        Fdbase.collection('users').doc(cred.user.uid).set({
            username,
            diet,
            email,
            password,
            zipcode
        }).then(() => {
            db.Users.create({
                UserId: cred.user.uid,
                username,
                diet,
                email,
                password,
                zipcode
            }).then(result => {
                res.json(result);
            });
        })
    })
})

// sign in existing user
app.post('/home', (req, res) => {
    email = req.body.email;
    password = req.body.password
    auth.signInWithEmailAndPassword(email, password)
    res.send(auth)
    statusLog()
})

// sign out singed in user
app.post('/signout', (req, res) => {
    auth.signOut()
    res.send(auth)
    statusLog()
})


app.get('/status', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            res.send(user)
            // res.send(true)
            console.log('signed in')
        } else {
            console.log("No user is signed in.")
            // res.send(false)
        }
    })
})

let statusLog = auth.onAuthStateChanged(user => {
    if (user) {
        console.log('signed in');
        console.log(user.email)
        console.log(user.uid)
        app.set('public', __dirname + '/public');
    } else {
        console.log('signed out!!!!!!!!');
    }
});


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening: http://localhost:${PORT}`);
    });
});