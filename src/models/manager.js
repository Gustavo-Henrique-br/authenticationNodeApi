const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

managerSchema.pre('save', async ()=>{
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

mongoose.model('Manager', managerSchema)