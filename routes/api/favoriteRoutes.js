const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    console.log(req.query)
    db.Favorite.findAll({
        where: {
            // id: req.params.id,
            UserId: req.query.UserId,
            // RecipeId: req.query.recipeId
        },
        include: [{ model: db.Users }, db.Recipe]
        // include: [db.User] || [db.Recipe]
        // include: [db.users]
    }).then(Favorites => {
        res.json(Favorites)
    })
});

router.post("/", (req, res) => {
    console.log(req.body)
    db.Favorite.create({
        title: req.body.title,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        UserId: req.body.UserId,
        RecipeId: req.body.recipeId,
        date: req.body.date,
    }).then(Favorites => {
        res.json(Favorites)
    });
});


module.exports = router;
