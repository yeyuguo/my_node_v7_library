const mongoose = require('mongoose');
const print = require('../../Print')
const errors = require('../../Error')
var Schema = mongoose.Schema


var schema = mongoose.Schema({
    userID:{type:Schema.Types.ObjectId,ref:'User'},
    loginRecord:[{type:Schema.Types.ObjectId,ref:'Login'}]
})

var model = mongoose.model('loginRecord',schema)

module.exports = model

