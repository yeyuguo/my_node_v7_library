var child_process = require('child_process');
var util = require('util');
var domain = require('domain')
var errors = require('../Error')
var print = require('../Print')


var process_handle = {
    // 执行命令行操作
    command:function(cmd,cb){
        /*
        执行命令行操作
        参考文章：http://wiki.jikexueyuan.com/project/nodejs-guide/process.html
        */
        child_process.exec(util.format(cmd,function(err){
            if(err){
                errors.return_err(err)
            }else{
                typeof cb == 'function' && cb()
            }
        }))
    },
    // 守护进程，进程死掉，重启进程
    restart_child:function(module){
        // 参考文章：http://wiki.jikexueyuan.com/project/nodejs-guide/application-scenarios.html
        var worker = child_process.spawn('node',[module]);
        worker.on('exit',function(code){
            if (code && code != 0){
                process.restart_child(module);
            }
        })
    },
    // process 对象提供了捕获全局异常的方法
    catch_error:function(error){
        /* 
            process 对象提供了捕获全局异常的方法
         */
        process.on('uncaughtException',function(err){
            // errors.return_err
            errors.print_err(err)
        })
    },
    // 捕获多层 回调异步 的错误
    domain_error:function(error,cb){
        /*
         捕获多层 回调异步 的错误
        参考文章：http://wiki.jikexueyuan.com/project/nodejs-guide/domain.html
        1.如果有  错误信息 && 回调；执行回调
        2.如果仅有 错误信息
        */
        var d = domain.create()
        d.on('error',function(){
            errors.print_err(error)
            errors.return_err(error)
        })

        d.run(function(){
            // 没有异常情况，正常执行异步回调函数；
            typeof cb == 'function' && cb()
        })
    }
    // TODO : 进程更多的函数封装；

}


module.exports = process_handle