const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({ message: "missing required fields" });
    }

    next();
  },
};
