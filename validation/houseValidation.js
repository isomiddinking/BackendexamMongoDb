const Joi = require("joi");

const createHomeValidation = Joi.object({
  region: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  house_number: Joi.number().min(0).max(5).optional(),
  street: Joi.string().trim().required(),
  family_numbers:  Joi.number().min(0).max(5).optional(),
  location:  Joi.string().optional(),
});

const updateHomeValidation = Joi.object({
  region: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  house_number: Joi.number().min(0).max(5).optional(),
  street: Joi.string().trim().optional(),
  family_numbers:  Joi.number().min(0).max(5).optional(),
  location:  Joi.string().optional(),
});

module.exports = { createHomeValidation, updateHomeValidation };