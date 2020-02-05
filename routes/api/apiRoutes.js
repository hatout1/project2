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

router.get("/one", (req, res) => {
    db.Users.findAll({
        where: {
            UserId: req.query.UserId
        }
    }).then(info => {
        res.json(info);
    })
})


router.put("/update", (req, res) => {
    db.Users.update(
        {
            username: req.body.username,
            diet: req.body.diet,
            adress: req.body.adress,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country
        }, {
        where: {
            UserId: req.body.UserId
        }
    }
    ).then(newinfo => {
        console.log(newinfo)
        res.json(newinfo)
    })

})



module.exports = router;