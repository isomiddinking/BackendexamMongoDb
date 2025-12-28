const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: {type: String, default: ""},
    price: {type: Number, default: ""},
    deckription: {type: String, default: ""}
})
const Product = model("Product", productSchema);

module.exports = {Product}