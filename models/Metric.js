const mongoose = require('mongoose')

const metricSchema = new mongoose.Schema({
    sleep: Number,
    stress: Number,
    energy: Number,
    mood: Number,
    diet: Number,
    // createdAt: { type: Date, default: Date.now },
    createdAt: Date,
    _by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Metric = mongoose.model('Metric', metricSchema)
module.exports = Metric;