const Contact = require("../models/contact-model");
const User = require("../models/user-model");


const contactForm = async (req, res) => {
    try {
        const { username, phone, email, message } = req.body;
        await Contact.create({ username, phone, email, message });
        res.status(201).send({
            msg: "Form Submitted Successfully"
        });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

module.exports = { contactForm };