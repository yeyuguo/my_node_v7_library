const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Model = mongoose.Model;
const print = require('../Print')
const errors = require('../Error')
const moment = require('moment')



mongoose.Promise = global.Promise;

db_option = {
    name:'blog_test',
    host:'localhost',
    port:'27017'
}

var db = mongoose.connect('mongodb://localhost:27017/test_table',{
    /*
    参考地址：
    1.写法：http://mongoosejs.com/docs/connections.html#use-mongo-client
    2.参数：https://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html
    */
    useMongoClient:true
},function(){
    // var usersModel =  require('./Document/users')
    // var usersModel =  require('./Model/normal_model.js')
    var voteModel = require('./Model/vote')
    // var usersModel = require('./Model/users')
})
db.on('error', function (err,callback) {
  // yay!
  print.error('数据库连接失败!')
  print.error(err.message)
  errors.return_err(err.message)
});

db.once('open', function (callback) {
    // yay!
    print.info('数据库连接成功!')
});

db.on('disconnected', function () {    
    console.log('数据库连接断开');  
})






// db_save(usersDoc)
function db_save(doc){
    /*
    option
    {
        doc:使用模型保存数据后的 document
        success:成功后的回调
    }
    */ 
    doc && doc.save(function(err,result){
        if(err){
            print.error(err);
            errors.return_err(err);
        }
        // var success = object.success
        // if( success && typeof success=='function' ){
        //     success(result)
        // }
        print.info(`保存 ${result} 到数据库成功`)
    })
}




db.close(function(err){
    if(err){
        print.error(err);
        errors.return_err()
    }else{
        print.info('数据库关闭成功!')
    }
})
// db_save({
//     doc:test_comment,
//     success:function(data){
//         print.log('hahah 第二次打印')
//     }
// })



