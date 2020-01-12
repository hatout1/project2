const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/:id", (req, res) => {
    db.Comment.findAll({
        Where: {
            userId: req.params.userId,
            recipeId: req.params.recipeId
        },
        include: [db.User] || [db.Recipe]
    })
}).then(comments => {
    res.json(comments)
});


router.post("/", (req, res) => {
    db.Comment.create({
        userId: req.body.userId,
        recipeId: req.body.recipeId,
        datePosted: req.body.date,
        body: req.body.body
    }).then(comments => {
        res.json(comments)
    });
});






module.exports = router;