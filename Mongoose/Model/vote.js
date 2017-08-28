const mongoose = require('mongoose');
var print = require('../../Print')
const errors = require('../../Error')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

var vote_people_schema = mongoose.Schema({
    userID:Number,
    create_time:Date
})

var voteSchema = mongoose.Schema({
    userID:{type:Schema.Types.Number,unique:true},
    // receive_num:Number,
    receive_random:[vote_people_schema],
    create_random:[vote_people_schema]
})

var voteModel = mongoose.model('votes',voteSchema,'votes')
var aa = 'xioayela'

var random = n=>{
    return Math.round(Math.random()*n)
}

var random_datas = (userID) => {
    var person = {
        userID:userID,
        receive_random:[],
        create_random:[]
    }
    for(var j=0;j<Math.random();j++){
        person.receive_random.push({
            userID:random(100),
            create_time:new Date()
        })
    }
    for(var j=0;j<Math.random();j++){
        person.create_random.push({
            userID:random(100),
            create_time:new Date()
        })
    }
    return person
}
var db = mongoose.createConnection('mongodb://localhost:27017/test_table?poolSize=10')
// db.model('vote').findOne({userID:{$lt:5}},'receive_random',function(err,result){
// db.model('vote').findOne({userID:{$lt:5}},function(err,result){
//     if(err){
//         print.error(err)
//         return err
//     }
//     print.log(result)
// })
db.setMaxListeners(10)  // 设置最大的连接数


for(var i=0;i<10;i++){
    // var userID = random(100);
    var userID = i;
    print.log(`当前用户：${userID}`);
    (function(userID){
    // 使用闭包，让for循环不影响内部的参数
        // print.log(`===> ${userID}`)
        query({
            conditions:{userID}
        })
    })(userID)
}
// db.close(function(err){
//     if(err){
//         print.error(err)
//         return errors.return_err(err)
//     }
//     print.log('db 已经关闭')
// })

function query(object){
    /*
    {
        conditions, 
        fields, 
        options, 
        callback
    }
    */
    // print.log(`----------------->${object.conditions.userID}`)
    
    var userID = object.conditions.userID
    db.model('votes').findOne(object.conditions,object.fields,object.options,function(err,result){
        if(!result){
            print.log(`不存在了该用户${userID},正在创建...`)
            // 数据创建
            db.model('votes').create(random_datas(userID))
            .then(function(err){
                if(err){
                    print.error(err);
                    return errors.return_err(err)
                }
                print.log(`成功创建${userID} 成功`)
            })
        }else{
            print.log(`已经存在了该用户${userID},正在更新...`)
            
            /*
            参考文章：https://stackoverflow.com/questions/41501939/how-to-update-a-array-value-in-mongoose
            数组 更新 
            */
            db.model('votes').update(
                {userID},
                {'$push':{'create_random':{userID:999,create_time:new Date()}}},
                function(err){
                    if(err){
                        print.error(err);
                        return errors.return_err(err)
                    }
                    print.log(`更新成功 ${userID} `)
                })
            
        }
    }).exec(function(err){
        if(err){
            print.error(err.message)
            return errors.return_err(err)
        }
        print.log('数据库关闭')
    })
   
    
}


module.exports = voteModel