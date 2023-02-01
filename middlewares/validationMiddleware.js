const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },

  updateContactValidatoin: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },
};
