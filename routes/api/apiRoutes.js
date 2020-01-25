const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/all", (req, res) => {
    db.Users.findAll({
        // include: [db.Users]
    }).then(users => {
        res.json(users);
    });
});

router.post("/", (req, res) => {
    db.Users.create({
        UserId: req.body.UserId,
        username: req.body.name,
        diet: req.body.diet,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        zipcode: req.body.zipcode
    }).then(result => {
        res.json(result);
    });
});




module.exports = router;