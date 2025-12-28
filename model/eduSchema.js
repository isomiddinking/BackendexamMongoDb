const {Schema, model} = require("mongoose")

const eduSchema = new Schema({
    city: {type: String, required: true},
    street: {type: String, required: true},
    center_name: {type: String, required: true},
    branch: {type: String},
    rating: {type: Number},
});

const Edu = model('edu', eduSchema);
module.exports = {Edu}