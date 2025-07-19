


const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        // res.status(400).json({ msg: error.errors[0].message });
        next({ status: 400, message: "Incorrect details", extraDetails: error.errors[0].message });
    }
}

module.exports = validate;