const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
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

managerSchema.pre('save', async next=>{
    if (!this.password) return
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

managerSchema.plugin(mongoosePaginate)

mongoose.model('Manager', managerSchema)