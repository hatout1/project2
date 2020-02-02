const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
    console.log(req.query)
    db.ShoppingList.findAll({
        where: {
            UserId: req.query.UserId
        },
        include: [{ model: db.Users }]
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

router.delete("/", (req, res) => {
    db.ShoppingList.destroy({
        where: {
            id: req.query.id
        }
    }).then(item => {
        console.log(item)
        // console.log(id)

        res.json(item)
    });
})


module.exports = router;