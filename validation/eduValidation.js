const Joi = require("joi");

const createEduValidation = Joi.object({
  city: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  center_name: Joi.string().trim().required(),
  branch: Joi.string().required(),
 rating: Joi.number().min(0).max(5).optional()
});

const updateEduValidation = Joi.object({
  city: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  center_name: Joi.string().trim().optional(),
  branch: Joi.string().optional(),
  rating: Joi.number().min(0).max(5).optional()
});

module.exports = { createEduValidation, updateEduValidation };
