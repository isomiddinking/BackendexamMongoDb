const Joi = require("joi");

const createCarValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Mashina nomi matn bo‘lishi kerak",
    "string.empty": "Mashina nomi bo‘sh bo‘lmasligi kerak",
    "any.required": "Mashina nomi kiritilishi shart",
  }),
  model: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  color: Joi.string().trim().required(),
  horsePower: Joi.number().required(),
  carType: Joi.string().trim().required(),
  chargin: Joi.string().trim().optional(),
  weight: Joi.string().trim().required(),
  gasoline: Joi.string().trim().required(),
  YearMachine: Joi.string().trim().required(),
  price: Joi.number().required(),
});

const updateCarValidation = Joi.object({
  title: Joi.string().trim().optional(),
  model: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  color: Joi.string().trim().optional(),
  horsePower: Joi.number().optional(),
  carType: Joi.string().trim().optional(),
  chargin: Joi.string().trim().optional(),
  weight: Joi.string().trim().optional(),
  gasoline: Joi.string().trim().optional(),
  YearMachine: Joi.string().trim().optional(),
  price: Joi.number().optional(),
});

module.exports = { createCarValidation, updateCarValidation };
