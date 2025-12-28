const { Router } = require('express');
const edu = Router();

const {
  postEdu,
  getEdu,
  getEduById,
  updateEdu,
  deleteEdu,
  searchEdu
} = require('../controllers/eduController');

const validationSchema = (schema)=> (req,res,next)=>{
    const validationResult = schema.validate(req.body);
    if (validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};
const {createEduValidation, updateEduValidation} = require("../validation/eduValidation")

/**
 * @swagger
 * tags:
 *    name: Edu
 *    description: Edu boshqarish uchun uchun API endopointlari
 */

/**
 * @swagger
 * /edu/postEdu:
 *   post: 
 *      summary: Yangi Edu ruyxatdan o'tkazish
 *      tags: [Edu]
 *      description: Yangi Edu yaratish
 *      requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                city:
 *                  type: string
 *                  description: Edu ning manzili
 *                street:
 *                  type: string
 *                  description: Edu ko'cha manzili
 *                center_name:
 *                  type: string
 *                  description: Eduning aninq manzili
 *                branch:
 *                  type: string
 *                  description: Edu 
 *                rating:
 *                  type: number
 *                  description: Edu ning raytingi
 *      responses:
 *       '201':
 *         description: Edu muvofaqiyatli ro'yxatda o'tdi
 *       '400':
 *         description: Yomon surov, validatsiya xatosi
 *       '500':
 *         description: icki server xatosi
 */
// postEdu
edu.post('/postEdu', validationSchema(createEduValidation), postEdu);

/**
 * @swagger
 * /edu/getEdu:
 *   get:
 *     summary: Barcha Edularni olish
 *     tags: [Edu]
 *     description: Barcha Edular ro'yxati
 *     responses:
 *       '201':
 *         description: Edular ro'yxati
 *       '500':
 *         description: icki server xatosi
 */
// getEdu
edu.get('/getEdu', getEdu);

/**
 * @swagger
 * /edu/getEduById/{id}:
 *   get:
 *     summary: Eduni ID bo‘yicha olish
 *     tags: [Edu]
 *     description: Eduni ID bo‘yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Edu ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Edu muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
// getEduById
edu.get('/getEduById/:id', getEduById);

/**
 * @swagger
 * /edu/searchEdu:
 *   get:
 *     summary: Eduni qidirish
 *     tags: [Edu]
 *     description: Eduni qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidruv surovi orqali Eduni izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvofaqiyatli qaytarildi
 *       400:
 *         description: Edu topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
// seachrEdu0a
edu.get('/searchEdu', searchEdu);

/**
 * @swagger
 * /edu/updateEdu/{id}:
 *   put:
 *     summary: Eduni yangilash
 *     tags: [Edu]
 *     description: Edu ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Edu olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Edu ning ko'chasi
 *               city:
 *                 type: string
 *                 description: Edu ning shahri 
 *     responses:
 *       '201':
 *         description: Edu muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so‘rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
// updateEdu
edu.put('/updateEdu/:id', updateEdu);

/**
 * @swagger
 * /edu/deleteEdu/{id}:
 *   delete:
 *     summary: Eduni O'chirish
 *     tags: [Edu]
 *     description: Eduni O'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Edu ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Edu muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
// deteleteEdu
edu.delete('/deleteEdu/:id', deleteEdu);

module.exports = { edu };
