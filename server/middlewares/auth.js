const admin = require("../firebase")
const User = require("../models/user")

exports.authCheck = async (req, res, next) => {
    try {

        // res.json({
        //     data: "hey you hit CREATE OR UPDATE USER URL.",
        // })

        console.log(req.headers); //token

        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);

        console.log("FIREBASE USER IN AUTH CHECK", firebaseUser);
        req.user = firebaseUser;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            err: "Invalid or expired token",
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email })
    if (adminUser.role !== "admin") {
        res.status(403).json({
            err: "Access denied. Only admin users are allowed."
        })
    }
    else {
        next();
    }
}