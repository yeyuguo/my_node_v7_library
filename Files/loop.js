const fs = require('fs')
const path = require('path')


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
                loop._travel_Sync(path_file,cb)
            }else{
                // print.log(typeof(path_file))
                typeof(cb)=='function' && cb(path_file)
            }
        })
    },
    _travel_Async:function(dir,cb,finish){
        var that = this;
        fs.readdir(dir,function(err,files){
            // log(files)
            /*
            loop.__async_handle.call(this)
            1.call 和 apply 调用会立马执行;
            2.需要指定 this 
             为什么 : 否则会返回把使用函数的作用域指向当前作用域，否则省略会附加给 window，
             原因 : 这是因为先判断加载给当前作用域的环境，如果没有，才会返回给 window 
            */ 
            loop.__async_handle.call(this,files,0,dir,cb,finish); 
        })
        // fs.readdir(dir, function (err, files) {
        //     (function next(i) {
        //         if (i < files.length) {
        //             var path_file = path.join(dir, files[i]);

        //             fs.stat(path_file, function (err, stats) {
        //                 if (stats.isDirectory()) {
        //                     loop._travel_Async(path_file, cb, function () {
        //                         next(i + 1);
        //                     });
        //                 } else {
        //                     cb(path_file, function () {
        //                         next(i + 1);
        //                     });
        //                 }
        //             });
        //         } else {
        //             finish && finish();
        //         }
        //     }(0));
        // });
    },
    __async_handle:function(files,index,dir,cb){
        if(files instanceof Array && index < files.length){
            var path_file = path.join(dir,files[index])
            fs.stat(path_file,function(err,stats){
                if(err){
                    
                    error.return_err(err)
                    // print.error(err)
                }else{
                    if(stats.isDirectory()){
                        // print.count()
                        loop._travel_Async(path_file,cb,function(){
                            index++
                            loop.__async_handle(files,index,path_file,cb)
                        })
                    }else{
                        // print.count()
                        // print.log(path_file)
                        typeof(cb) == 'function' && cb(path_file)
                    }
                }
            })
        }else{
            typeof finish == 'function' && finish()
        }
    },
    main:function(object){
        /*
        参数：
        {
            dir:'',
            success:function(){},
            AsyncBool:false
        }
        AsyncBool:
        1.true ：加载 _travel_Async()
        2.false :加载 __travel_Sync()
        */ 
        
        var AsyncBool = object.AsyncBool == undefined ? false : object.AsyncBool // 默认是开启同步获取数据
        if(AsyncBool){
            this._travel_Async(object.dir,object.success)
        }else{
            this._travel_Sync(object.dir,object.success)
        }
    }
}


loop.main({
    dir:'../node_modules',
    success:function(data){print.success(data)},
    AsyncBool:true
})
// var print = require('../Print/index')
// console.log(print)
// print().log('aa')


// exports.loop = loop
module.exports = loop