// middleware/authJwt.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send("Token puudub");
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send("Vigane token");
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user.is_admin) return res.status(403).send("Admini õigused vajalikud");
        next();
    } catch (error) {
        res.status(500).send("Serveri viga");
    }
};