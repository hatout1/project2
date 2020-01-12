const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    db.User.findAll({
        // include: [db.Post]
    }).then(users => {
        res.json(users);
    });
});

router.post("/", (req, res) => {
    db.User.create({
        userId: req.body.userId,
        name: req.body.name,
        diet: req.body.diet,
        zipcode: req.body.zipcode
    }).then(result => {
        res.json(result);
    });
});




module.exports = router;