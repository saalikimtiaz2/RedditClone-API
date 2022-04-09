const express = require("express");

const router = express.Router();

// ROUTE => /user
// TYPE  => GET
// DESC  => some description
router.get("/", (req, res) => {
    try {
        return res.status(200).json({ message: "Hello World!" });
    } catch (err) {
        return res.status(500).json({ errors: [{ error: err.message }] });
    }
});

router.use("*", (req, res) => {
    const payload = {
        route: "/user",
        message: "Api Connected!",
        error: "Route not defined",
    };
    return res.status(200).json({ payload });
});

module.exports = router;
