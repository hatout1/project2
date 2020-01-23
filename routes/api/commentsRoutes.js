const express = require("express");
const router = express.Router();
const db = require("../../models");
var moment = require('moment');
moment().format();
let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

router.get("/", (req, res) => {
    console.log(req.query)
    db.Comment.findAll({
        where: {
            // id: req.params.id,
            UserId: req.query.userId,
            RecipeId: req.query.recipeId
        },
        include: [{ model: db.Users }, db.Recipe]
        // include: [db.User] || [db.Recipe]
        // include: [db.users]
    }).then(comments => {
        res.json(comments)
    })
});

router.post("/", (req, res) => {
    console.log(req.body)
    db.Comment.create({
        userId: req.body.userId,
        RecipeId: req.body.recipeId,
        date: currentTime,
        body: req.body.body
    }).then(comments => {
        res.json(comments)
    });
});


module.exports = router;