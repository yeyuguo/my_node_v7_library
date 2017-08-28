const mongoose = require('mongoose');
const print = require('../../Print')
const errors = require('../../Error')
const usersModel = require('../Model/users')

const moment = require('moment')
var format = 'YYYY-MM-DD HH:mm:SS'

var Schema = mongoose.Schema


// var usersDoc = new usersModel({
//     userID:001,
//     userName:'xiaoye1'
// })

// usersDoc.save(function(err,result){
//     if(err){
//         print.error(err);
//         errors.return_err(err);
//     }
//     print.info(`users document 保存 ${result} 到数据库成功`)
// })


usersModel.find(function(err,result){
    print.log(0)
    if(err){
        print.error(err);
        return errors.return_err(err);
    }
    // print.log(0)
    print.log({result})
    insert(result)
    // print.log({result})
})
print.log(1)


function insert(data){
    if(!data || data instanceof Array){
        print.error(data)
        return errors.return_err(data)
    }
    for(var i=data.length || 0; i<10; i++){
        if(i<5){
            usersModel.update({
                userID:i,
                userName:`小叶${i}`,
                // lastLogin:moment(new Date()).format(format)
                lastLogin:new Date()
            },function(err){
                if(err){
                    print.error(err)
                    return errors.return_err(err)
                }else{
                    print.info('update 更新到 db 成功')
                }
            });
        }else{
            usersModel.create({
                userID:i,
                userName:`xiaoye${i}`,
                lastLogin:new Date()
            },function(err){
                if(err){
                    print.error(err)
                    errors.return_err(err)
                }else{
                    print.log(`create 更新到 db 成功`)
                }
            })
        }
    }
}






module.exports = usersModel