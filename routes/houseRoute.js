const express = require('express');
const House = express.Router();
const {
  postHouse,
  getHouse,
  getHouseById,
  updateHouse,
  deleteHouse,
  searchHouse
} = require('../controllers/houseController');

const validationSchema = (schema)=> (req,res,next)=>{
    const validationResult = schema.validate(req.body);
    if (validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};
const {createHomeValidation, updateHomeValidation} = require("../validation/houseValidation")

/**
 * @swagger
 * tags:
 *    name: House
 *    description: House boshqarish uchun uchun API endopointlari
 */

/**
 * @swagger
 * /house/postHouse:
 *   post: 
 *      summary: Yangi House ruyxatdan o'tkazish
 *      tags: [House]
 *      description: Yangi House yaratish
 *      requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                region:
 *                  type: string
 *                  description: House Viloyati
 *                city:
 *                  type: string
 *                  description: House ning manzili
 *                house_number:
 *                  type: number
 *                  description: Housening raqami
 *                street:
 *                  type: string
 *                  description: House ko'chasi
 *                family_numbers:
 *                  type: number
 *                  description: House dagi insonlar soni
 *                location:
 *                  type: string
 *                  description: House aniq manzili    
 *      responses:
 *       '201':
 *         description: House muvofaqiyatli ro'yxatda o'tdi
 *       '400':
 *         description: Yomon surov, validatsiya xatosi
 *       '500':
 *         description: icki server xatosi
 */
House.post('/postHouse', validationSchema(createHomeValidation), postHouse);


/**
 * @swagger
 * /house/getHouse:
 *   get:
 *     summary: Barcha Houselarni olish
 *     tags: [House]
 *     description: Barcha Houselar ro'yxati
 *     responses:
 *       '201':
 *         description: Houselar ro'yxati
 *       '500':
 *         description: icki server xatosi
 */
House.get('/getHouse', getHouse);

/**
 * @swagger
 * /house/getById/{id}:
 *   get:
 *     summary: Houseni ID bo‘yicha olish
 *     tags: [House]
 *     description: Houseni ID bo‘yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: House ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: House muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
House.get('/getById/:id', getHouseById);

/**
 * @swagger
 * /house/searchUser:
 *   get:
 *     summary: Houseni qidirish
 *     tags: [House]
 *     description: Houseni qidirish 
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidruv surovi orqali Houseni izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvofaqiyatli qaytarildi
 *       400:
 *         description: House topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
House.get('/searchHouse', searchHouse);


/**
 * @swagger
 * /house/Update/{id}:
 *   put:
 *     summary: Houseni yangilash
 *     tags: [House]
 *     description: House ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: House olish uchun ID
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
 *                region:
 *                  type: string
 *                  description: House Viloyati
 *                city:
 *                  type: string
 *                  description: House ning manzili
 *                house_number:
 *                  type: number
 *                  description: Housening raqami
 *                street:
 *                  type: string
 *                  description: House ko'chasi
 *                family_numbers:
 *                  type: number
 *                  description: House dagi insonlar soni
 *                location:
 *                  type: string
 *                  description: House aniq manzili  
 *     responses:
 *       '201':
 *         description: House muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so‘rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
House.put('/Update/:id', updateHouse);


/**
 * @swagger
 * /house/delete/{id}:
 *   delete:
 *     summary: Houseni O'chirish
 *     tags: [House]
 *     description: Houseni O'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: House ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: House muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
House.delete('/delete/:id', deleteHouse);



module.exports = {House};