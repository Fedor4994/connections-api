const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.allow("").string(),
      phone: Joi.allow("").string(),
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
      name: Joi.allow("").string(),
      email: Joi.allow("").string(),
      phone: Joi.allow("").string(),
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
