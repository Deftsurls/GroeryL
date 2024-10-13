const mongoose = require('mongoose');

const shoppingList = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min:0
    },
    unit: {
        type: String,
        required: true,
        enum: ['KG', 'LB', 'GR', '1 Caja X 32 ', 'Unidad', 'Arroba', 'L', ]
    }
})

const Groceries = mongoose.model('Groceries', shoppingList);

module.exports = Groceries;