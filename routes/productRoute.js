const {Router} = require('express')
const product = Router()

const { postProduct, getProducts } = require('../controllers/productController')

product.post('/postProducts', postProduct)
product.get('/getPdocuts', getProducts)

module.exports = {product}