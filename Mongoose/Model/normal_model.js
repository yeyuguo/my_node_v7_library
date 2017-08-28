const mongoose = require('mongoose');
const print = require('../../Print')
const errors = require('../../Error')
var Schema = mongoose.Schema

var normalSchema = mongoose.Schema({
    userID:Number,
    userName:String,
    sex:Number
})

var normalModel = mongoose.model('normal',normalSchema)

module.exports = normalModel