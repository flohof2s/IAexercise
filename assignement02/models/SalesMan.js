const mongoose = require('mongoose')

const SalesManSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        }
    }
)

const SalesMan = mongoose.model('salesmen',SalesManSchema);

module.exports = SalesMan;