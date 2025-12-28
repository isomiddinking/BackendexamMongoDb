const { Product } = require('../model/productSchema');

// postProduct
const postProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            deckription
        } = req.body;
        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({
                seccess: false,
                message: 'Bu nom bilan maxsulot mavjud'
            })
        } else {
            const newProduct = new Product({
                title,
                price,
                deckription
            });
            await newProduct.save();
            res.status(201).json({
                success: true,
                message: "Maxsulot muvofaqiyatli qushildi",
                product: newProduct
            })
        }
    }catch(error){
          res.status(500).json({seccess: false, message: "Serverda xatolik yuz berdi", error: error.message});
    }
}


// getProducts
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      message: 'Barcha foydalanuvchilar',
      innerData: products,
    });
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server xatosi',
      error: err.products
    });
  }
};
module.exports = {postProduct,getProducts}