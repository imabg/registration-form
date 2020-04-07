const express = require("express");

const router = express.Router();

const UserController = require("../controller/userController");
const IPController = require("../controller/IPController");

router.post("/ip",IPController.checkIP)
router.post("/register", UserController.register)

module.exports = router;