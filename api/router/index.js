const express = require("express");
const user = require("./userRouter");

const router = express.Router();


// Rutas
router.use("/user", user);

module.exports = router;