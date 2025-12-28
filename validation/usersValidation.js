const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Foydalanuvchi nomi matn bo‘lishi kerak",
      "string.empty": "Foydalanuvchi nomi bo‘sh bo‘lmasligi kerak",
      "string.min": "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo‘lishi kerak",
      "any.required": "Username kiritilishi shart",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
      "Parolda kamida 1 ta harf, 1 ta raqam va 1 ta maxsus belgi bo‘lishi kerak",
      "string.empty": "Parol kiritilishi kerak",
      "any.required": "Parol majburiy",
    }),

  firstname: Joi.string().trim().optional(),
  lastname: Joi.string().trim().optional(),
  birthday: Joi.string().optional(),
  jinsi: Joi.string().optional(),
  address: Joi.string().trim().optional(),

  phone: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Telefon raqam +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak",
      "any.required": "Telefon raqam majburiy",
    }),
  car_id: Joi.string().optional(),
  house_id: Joi.string().optional(),
  edu_id: Joi.string().optional(),
});

const updateUsersValidation = Joi.object({
  username: Joi.string().trim().min(3).max(50).optional(),
  password: Joi.string()
    .optional()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
    .optional(),
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  birthday: Joi.string().optional(),
  jinsi: Joi.string().optional(),
  address: Joi.string().trim().optional(),
  phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
});

module.exports = { registerValidation, updateUsersValidation };