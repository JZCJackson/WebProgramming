const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShipwreckSchema = new Schema({
    recrd: {
        type: String,
        required: true
    },
    vesslterms: {
        type: String,
        required: true
    },
    feature_type: {
        type: String,
        required: true
    },
    chart: {
        type: String,
        required: true
    },
    latdec: {
        type: Number,
        required: true
    },
    londec: {
        type: Number,
        required: true
    },
    gp_quality: {
        type: String,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    sounding_type: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
    },
    quasou: {
        type: String,
        required: true
    },
    watlev: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
})

module.exports = Shipwreck = mongoose.model('shipwreck', ShipwreckSchema)