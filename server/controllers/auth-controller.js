const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async (req, res) => {
    try {
        res.status(200).send("from auth controller");
    } catch (error) {
        console.log("error====", error);
    }
}

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "email already exists" });
        } else {
            // hash the password using bcryptjs
            // const saltRound = 10;
            // const hashPassword = bcrypt.hash(password, saltRound);
            const userCreated = await User.create({ username, email, phone, password });
            res.status(201).send({
                msg: "New user registered successfully",
                token: userCreated.generateToken(),
                userId: userCreated._id.toString()
            });
        }
    } catch (error) {
        console.log("error from register controller", error);
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailValid = await User.findOne({ email });
        if (isEmailValid) {
            // check for password
            // const ispasswordValid = await bcrypt.compare(password, isEmailValid.password);
            const ispasswordValid = await isEmailValid.comparePassword(password);
            if (ispasswordValid) {
                res.status(200).json({
                    msg: "Login successful",
                    token: isEmailValid.generateToken(),
                    userId: isEmailValid._id.toString()
                })
            } else {
                res.status(401).json({ msg: "Invalid email or password" });
            }

        } else {
            res.status(400).json({ msg: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}


const userAuth = async (req, res) => {
    try {
        res.status(200).json({
            msg: "Token authentication received",
            data: req.data
        });
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = { home, register, login, userAuth }