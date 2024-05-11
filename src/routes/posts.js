const express = require("express");
const router = express.Router();

let posts = [{ id: 0, title: "Primer Publicacion" }];

router.get("/", (req, res) => {
    res.json(posts);
});

module.exports = router;
