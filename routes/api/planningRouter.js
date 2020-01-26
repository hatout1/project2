const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    console.log(req.query)
    db.Planning.findAll({
        where: {
            // id: req.params.id,
            UserId: req.query.userId,
            RecipeId: req.query.recipeId,
            day: req.query.day,
            meal: req.query.meal
        },
        include: [{ model: db.Users }, db.Recipe]
        // include: [db.User] || [db.Recipe]
        // include: [db.users]
    }).then(plans => {
        res.json(plans)
    })
});

router.post("/", (req, res) => {
    console.log(req.body)
    db.Planning.create({
        UserId: req.body.userId,
        RecipeId: req.body.recipeId,
        title: req.body.title,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        day: req.body.day,
        meal: req.body.meal,
    }).then(plan => {
        res.json(plan)
    });
});


module.exports = router;