const {Router} = require('express')
const car = Router()

const { postCar, getCar, updateCar, deleteCar, searchCar, getCarById } = require('../controllers/carController')

const validationSchema = (schema)=> (req,res,next)=>{
    const validationResult = schema.validate(req.body);
    if (validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};
const {createCarValidation, updateCarValidation} = require("../validation/carValidation")

/**
 * @swagger
 * tags:
 *    name: Car
 *    description: Car boshqarish uchun uchun API endopointlari
 */

/**
 * @swagger
 * /car/postCar:
 *   post: 
 *      summary: Yangi Car ruyxatdan o'tkazish
 *      tags: [Car]
 *      description: Yangi Car yaratish
 *      requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                  description: Moshina nomi
 *                model:
 *                  type: string
 *                  description: Moshina modeli
 *                description:
 *                  type: string
 *                  description: Moshina tavsifi
 *                color:
 *                  type: string
 *                  description: Moshina rangi
 *                horsePower:
 *                  type: number
 *                  description: Moshuna ot kuchi    
 *                carType:
 *                  type: string
 *                  description: Moshina turi
 *                chargin:
 *                  type: string
 *                  description: Moshina quvati 
 *                weight:
 *                  type: string
 *                  description: Moshina kengligi 
 *                gasoline:
 *                  type: string
 *                  description: Yonilgi'i turi
 *                YearMachine:
 *                  type: string
 *                  description: Moshina yili
 *                price:
 *                  type: number
 *                  description: Moshina narxi
 *      responses:
 *       '201':
 *         description: Car muvofaqiyatli ro'yxatda o'tdi
 *       '400':
 *         description: Yomon surov, validatsiya xatosi
 *       '500':
 *         description: icki server xatosi
 */
car.post('/postCar', validationSchema(createCarValidation),  postCar)


/**
 * @swagger
 * /car/getCar:
 *   get:
 *     summary: Barcha Carlarni olish
 *     tags: [Car]
 *     description: Barcha Carlar ro'yxati
 *     responses:
 *       '201':
 *         description: Carlar ro'yxati
 *       '500':
 *         description: icki server xatosi
 */
// getcar
car.get('/getCar', getCar)

/**
 * @swagger
 * /car/getCarById/{id}:
 *   get:
 *     summary: Carni ID bo‘yicha olish
 *     tags: [Car]
 *     description: Carni ID bo‘yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
// getCarById
car.get('/getCarById/:id', getCarById)

/**
 * @swagger
 * /car/searchCar:
 *   get:
 *     summary: Carni qidirish
 *     tags: [Car]
 *     description: Carni qidirish (masalan, nomi yoki modeli bilan)
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidruv surovi orqali Carni izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvofaqiyatli qaytarildi
 *       400:
 *         description: Car topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
// searchCar
car.get('/searchCar', searchCar)

/**
 * @swagger
 * /car/updateCar/{id}:
 *   put:
 *     summary: Carni yangilash
 *     tags: [Car]
 *     description: Car ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car olish uchun ID
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
 *               title:
 *                 type: string
 *                 description: Moshina yagona nomi
 *               color:
 *                 type: string
 *                 description: Moshina rangi
 *               description:
 *                 type: string
 *                 description: Moshina Tavsifi
 *               price:
 *                 type: number
 *                 description: Moshina narxi
 *     responses:
 *       '201':
 *         description: Car muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so‘rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
// updateCar
car.put('/updateCar/:id', updateCar)

/**
 * @swagger
 * /car/deleteCar/{id}:
 *   delete:
 *     summary: Carni O'chirish
 *     tags: [Car]
 *     description: Carni O'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Car ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */
// deleteCar
car.delete('/deleteCar/:id', deleteCar);    


module.exports = {car}