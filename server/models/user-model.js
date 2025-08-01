const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

// hashing the password using mongoose schema pre method and bcrypt
userSchema.pre("save", async function (next) {
    // console.log("pre method", this);
    const user = this;

    if (!user.isModified("password")) {
        next();
    } else {
        try {
            const saltRound = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(user.password, saltRound);
            user.password = hashPassword;
        } catch (error) {
            next(error);
        }
    }

});

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        );
    } catch (error) {
        console.error(error);
    }
}

userSchema.methods.comparePassword = async function (password) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("error===", error);
    }
}

const User = new mongoose.model("User", userSchema)

module.exports = User;