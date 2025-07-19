const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            res.status(400).json({ msg: "invalid token or expired token" });
        }
        const jwtToken = token.replace("Bearer ", "").trim();
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const getUser = await User.findOne({ email: isVerified.email }).select({
            password: 0
        });

        req.data = getUser;
        next();
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

module.exports = authMiddleware;