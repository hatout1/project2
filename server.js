const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8500;

// require('dotenv').config();

// const firebaseConfig = process.env.FireBaseConfig;
// firebase.initializeApp(firebaseConfig);


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

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening: http://localhost:${PORT}`);
    });
});