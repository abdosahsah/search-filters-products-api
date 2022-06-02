const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    inStock: {
        type: Boolean,
        required: true,
    },
},

{ timestamps: true, }

)

const Product = mongoose.model('product', productSchema);

module.exports = Product;