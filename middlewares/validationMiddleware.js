const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().allow(""),
      phone: Joi.string().allow(""),
      favorite: Joi.boolean(),
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
      name: Joi.string().allow(""),
      email: Joi.string().allow(""),
      phone: Joi.string().allow(""),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },

  updateStatusContactValidatoin: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },

  registerValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    });

    const validatoinResult = schema.validate(req.body);
    if (validatoinResult.error) {
      return res.status(400).json({
        message: `${validatoinResult.error}`,
      });
    }

    next();
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
