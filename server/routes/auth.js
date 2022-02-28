const express = require("express")
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");


const myMiddleware = (req, res, next) => {
    console.log("I am a MIDDLE WARE. YAYYYY")
    next();
}



//route
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;