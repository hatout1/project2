const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8500;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

const apiRoutes = require("./routes/api/apiRoutes");
app.use("/api/user", apiRoutes);

const recipeRoutes = require("./routes/api/recipeRoutes");
app.use("/api/recipe", recipeRoutes);

const clientRoutes = require("./routes/client/htmlRoutes");
app.use("/", clientRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening: http://localhost:${PORT}`);
    });
});