const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60,
        trim: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    risk: {
        type: Number,
        required: true,
        default: 0
    },
    value: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value must be a positive number')
            }
        }
    },
    participants: {
        type: Array,
        require: true
    }
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project