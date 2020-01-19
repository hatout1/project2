const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8500;

require('dotenv').config();

const firebase = require('firebase');

console.log(process.env.apiKey)

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

const apiRoutes = require("./routes/api/apiRoutes");
app.use("/api/user", apiRoutes);

const recipeRoutes = require("./routes/api/recipeRoutes");
app.use("/api/recipe", recipeRoutes);

const clientRoutes = require("./routes/client/htmlRoutes");
app.use("/", clientRoutes);

const commentRoutes = require("./routes/api/commentsRoutes");
app.use("/api/comment", commentRoutes)
let email = "";
let password = "";

app.post('/login', (req, res) => {
    email = req.body.email;
    password = req.body.password
    auth.signInWithEmailAndPassword(email, password)
    res.send(auth)
})


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening: http://localhost:${PORT}`);
    });
});