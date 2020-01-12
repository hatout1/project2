const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/:id", (req, res) => {
    db.Recipe.findAll({
        where: { recipeId: req.params.id },
        include: [db.User]
    }).then(recipes => {
        res.json(recipes);
    });
});

router.post("/", (req, res) => {
    db.Recipe.create({
        title: req.body.title,
        majorIngr: req.body.majorIngr,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        userId: req.body.userId
    }).then(recipes => {
        res.json(recipes);
    });
});

module.exports = router;