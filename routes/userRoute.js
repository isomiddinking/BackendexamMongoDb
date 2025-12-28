const { Router } = require('express')
const users = Router()

const { postUser, getUsers, getUserById, updateUser, deleteUser, searchUSer, postLogin } = require('../controllers/users.controllers')

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};
const { registerValidation, updateUsersValidation } = require("../validation/usersValidation");



/**
 * @swagger
 * tags:
 *    name: Users
 *    description: Foydalanuvchi boshqarish uchun uchun API endopointlari
 */

/**
 * @swagger
 * /users/register:
 *   post: 
 *      summary: Yangi foydalanuvchi ruyxatdan o'tkazish
 *      tags: [Users]
 *      description: Yangi foydalanuvchi yaratish
 *      requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                username:
 *                  type: string
 *                  description: Yoydalanuvchi yagona username
 *                password:
 *                  type: string
 *                  description: Foydalanuvchi akkaunti uchun parol
 *                firstname:
 *                  type: string
 *                  description: Foydalanuvchining ismi
 *                lastname:
 *                  type: string
 *                  description: Foydalanuvchi familyasi
 *                birthday:
 *                  type: string
 *                  description: Foydalanuvchining tug'ilgan kuni (YYYY-MM-DD) formatda
 *                gender:
 *                  type: string
 *                  description: Foydalanuvchi ismi    
 *                address:
 *                  type: string
 *                  description: Foydalanuvchi manzili
 *                phone:
 *                  type: string
 *                  description: Foydalanuvchi telefon raqami
 *                car_id:
 *                  type: string
 *                  description: Foydalanuvchi moshina idsi
 *                house_id:
 *                  type: string
 *                  description: Foydalanuvchi uy idsi
 *                edu_id:
 *                  type: string
 *                  description: Foydalanuvchi markaz idsi
 *      responses:
 *       '201':
 *         description: Foydalanuvchi muvofaqiyatli ro'yxatda o'tdi
 *       '400':
 *         description: Yomon surov, validatsiya xatosi
 *       '500':
 *         description: icki server xatosi
 */

/**
 * @swagger
 * /users/postLogin:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     tags: [Users]
 *     description: Foydalanuvchi kiritilgan ma'lumotlar bilan tizimga kiradi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchining elektron pochta manzili yoki login nomi
 *               password:
 *                 type: string
 *                 description: Foydalanuvchining paroli
 *     responses:
 *       '201':
 *         description: Foydalanuvchi muvaffaqiyatli tizimga kirdi
 *       '400':
 *         description: Noto'g'ri ma'lumotlar
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /users/getUser:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     description: Barcha foydalanuvchilar ro'yxati
 *     responses:
 *       '201':
 *         description: Foydalanuvchilar ro'yxati
 *       '500':
 *         description: icki server xatosi
 */

/**
 * @swagger
 * /users/getUserById/{id}:
 *   get:
 *     summary: Foydalanuvchini ID bo‘yicha olish
 *     tags: [Users]
 *     description: Foydalanuvchini ID bo‘yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Foydalanuvchi ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /users/searchUser:
 *   get:
 *     summary: Foydalanuvchini qidirish
 *     tags: [Users]
 *     description: Foydalanuvchini qidirish (masalan, ism yoki username bilan)
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidruv surovi orqali foydalanuvchini izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvofaqiyatli qaytarildi
 *       400:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     description: Foydalanuvchi ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Foydalanuvchi olish uchun ID
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
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi yagona username
 *               firstname:
 *                 type: string
 *                 description: Foydalanuvchining ismi
 *               lastname:
 *                 type: string
 *                 description: Foydalanuvchining familiyasi
 *               phone:
 *                 type: string
 *                 description: Foydalanuvchining telefon raqami
 *     responses:
 *       '201':
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so‘rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Foydalanuvchini O'chirish
 *     tags: [Users]
 *     description: Foydalanuvchini O'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Foydalanuvchi ID sini kiriting
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli olindi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Ichki server xatosi
 */

users.post("/register", validationSchema(registerValidation), postUser)
users.post("/postLogin", postLogin)
users.get('/getUser', getUsers)
users.get("/getUserById/:id", getUserById)
users.put("/updateUser/:id", updateUser)
users.delete("/deleteUser/:id", deleteUser)
users.get("/searchUser", searchUSer)

module.exports  = {users} 