const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    console.log(req.query)
    db.ShoppingList.findAll({
        where: {
            // id: req.params.id,
            UserId: req.query.UserId
        },
        include: [{ model: db.Users }]
        // include: [db.User] || [db.Recipe]
        // include: [db.users]
    }).then(items => {
        res.json(items)
    })
});

router.post("/", (req, res) => {
    console.log(req.body)
    db.ShoppingList.create({
        UserId: req.body.UserId,
        item: req.body.item,
    }).then(item => {
        res.json(item)
    });
});


module.exports = router;