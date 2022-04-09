const express = require("express");
const User = require("./routes/user");

const router = express.Router();

router.use("/user", User);

router.use("*", (req, res) => {
    const payload = {
        route: "/",
        message: "Api Connected!",
        error: "Route not defined",
    };
    return res.status(200).json({ payload });
});

module.exports = router;
