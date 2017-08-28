const mongoose = require('mongoose');
const print = require('../../Print')
const errors = require('../../Error')
var Schema = mongoose.Schema

var user_schema = mongoose.Schema({
    user:Number
})

var user_modle = mongoose.model('user_schema',user_schema)
/* 建立 schema */
var blogSchema = mongoose.Schema({
    title:String,
    userID:{type:Schema.Types.ObjectId,ref:'user_modle'} // ref 表示 被关联 model 
})
// 设置自增
blogSchema.set('autoIndex',true); // 设置索引自增  http://www.nodeclass.com/api/mongoose.html#guide
// 新添 schema
blogSchema.add({sex:String})


// blogSchema.pre('save',function(next){
//     print.info('pre save!')
//     next()
// })

// 为 schema 继承一个方法
blogSchema.method.aa = function(){
    print.dir('blog schema this:',Object.keys(this));
}

/* 建立 model */
const blogModel = mongoose.model('blog_comments',blogSchema) // 如有有第三参数，就把第三参数作为数据表存储

module.exports = blogModel