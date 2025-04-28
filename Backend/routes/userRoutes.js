const express = require("express");
const { verifyUser, addUsers } = require("../controllers/userController");

const router = express.Router();
//Login Route
router.get("/login", verifyUser);
router.get("/addusers", addUsers);


module.exports = router;