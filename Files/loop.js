const fs = require('fs')
const path = require('path')
var colors = require('colors')
// var log  = console.log
var error = require('../Error')
var print = require('../Print')


var loop = {
    _travel_Sync:function(dir,cb){
        /*
        遍历文件夹，直到是一个文件以外
        */
        var path_content = fs.readdirSync(dir);
        path_content.forEach(function(file){
            var path_file = path.join(dir,file);

            if(fs.statSync(path_file).isDirectory()){
                loop._travel_Sync(path_file)
            }else{
            // log(path_file)
                typeof(path_file)=='function' && cb(path_file)
            }
        })
    },
    _travel_Async:function(dir,cb,finish){
        var that = this;
        fs.readdir(dir,function(err,files){
            // log(files)
            /*
            1.call 和 apply 调用会立马执行;
            2.需要指定 this ,
             为什么 : 否则会返回把当前执行的环境，附加给 window，
             原因 : 这是因为先加载子级作用域的环境，才会执行 call 函数的调用
            */ 
            that.__async_handle.call(this,files,0,dir,cb,finish); 
        })
    },
    __async_handle:function(files,index,dir,cb){
        // var that = this
        var index
        if(files instanceof Array && index < files.length){
            var path_file = path.join(dir,files[index])
            fs.stat(path_file,function(err,stats){
                if(err){
                    // log(colors.red(err))
                    error.return_err(err)
                    print.error(err)
                }else{
                    if(stats.isDirectory()){
                        
                        // print.log(path_file)
                        print.count()
                        loop._travel_Async(path_file,cb,function(){
                            index++
                            loop.__async_handle(files,index,path_file,cb)
                        })
                    }else{
                        print.log(path_file)
                        typeof(cb) == 'function' && cb(path_file,function(){
                            index++
                            loop.__async_handle(files,index,path_file,cb)
                        })
                    }
                }
            })
        }else{
            typeof finish == 'function' && finish()
        }
    },
    main:function(dir,cb,AsyncBool){
        /*
        AsyncBool:
        1.true ：加载 _travel_Async()
        2.false :加载 __travel_Sync()
        */ 
        var AsyncBool = AsyncBool || 'false' // 默认是开启同步获取数据
        if(AsyncBool){
            this._travel_Async(dir,cb)
        }else{
            this._travel_Sync(dir,cb)
        }
    }
}
function print(data){
    log(colors.rainbow(data))
}

loop.main('../node_modules',function(data){console.log(data)})
// var print = require('../Print/index')
// console.log(print)
// print().log('aa')


// exports.loop = loop
module.exports = loop