const mongoose = require('mongoose');
const print = require('../../Print')
const errors = require('../../Error')
var Schema = mongoose.Schema

var user_schema = mongoose.Schema({
    userID:{ type: Number,unique:true },
    avatarUrl:String,
    userName:String,
    nickName:String,
    sex:Number, // 便于判断使用图标
    city:String,
    lastLogin:Date,
    email:String
})

// user_schema.set('autoIndex',true);
// var user_model = mongoose.model('user_schema',user_schema,'user')

// user_model.remove()

var users_schema = mongoose.Schema({
    userID:{  // 这里的 userID 是不可变的？该如何解决
        user_schema
    }
})
var users_model = mongoose.model('users',user_schema)

createUser({
    userID:4,
    userName:'xiaoyeye4'
})

function createUser(userObject){
    var db = mongoose.createConnection('mongodb://localhost:27017/test_table')
    db.setMaxListeners(2);
    db.model('users')
        .findOne({
            userID:userObject.userID
        },function(err,result){
            if(err){
                print.error(err.message);
                return errors.return_err(err);
            }
            if(!result){
                print.log('不存在该用户，可以创建..')
                db.model('users').create(userObject,function(err,result){
                    if(err){
                        print.error(err.message);
                        return errors.return_err(err);
                    }
                    print.log(`创建用户 ${userObject.userName} 成功`)
                })
            }else{
                print.log('存在该用户，请重新换个用户名或邮箱')
            }
            
        })
        .exec(function(){  // 保证数据库是关闭的
            db.close()
        })
    
        
}

module.exports = users_model
// module.exports = user_model