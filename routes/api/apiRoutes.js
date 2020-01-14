const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    db.Users.findAll({
        // include: [db.Users]
    }).then(users => {
        res.json(users);
    });
});

router.post("/", (req, res) => {
    db.Users.create({
        userId: req.body.userId,
        name: req.body.name,
        diet: req.body.diet,
        zipcode: req.body.zipcode
    }).then(result => {
        res.json(result);
    });
});




module.exports = router;