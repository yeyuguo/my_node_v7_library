const colors = require('colors');

// var print = Symbol('我自己定义的 console');
var count_num = 0
// console.prototype.count =  'aa'  // 该方法会报错，不能设置原型方法？？？？？？？？ console.prototype ?=  console.__proto__
console.__proto__.count = function(){   
    // 扩展一个 nodejs 端的 count 方法，该扩展，可以影响原来函数，达到和 console.prototype 一样的扩展目的
    count_num++
}
console.__proto__.debug = function(data){
    // 扩展一个 nodejs 端的 count 方法
    return console.log(data)
}
var print = {
    /*
    console 完整的函数内容：https://segmentfault.com/a/1190000002511877
    该模块仅仅作为加工一些输出模块，不做任何日志记录，日志记录的在 error 里处理；
    console.log: 彩色;
    console.info: 绿色;
    console.debug: 蓝色;
    console.error: 红色;
    nodejs console：
    Console={
        log: [Function: bound log],
        info: [Function: bound log],
        warn: [Function: bound warn],
        error: [Function: bound warn],
        dir: [Function: bound dir],
        time: [Function: bound time],
        timeEnd: [Function: bound timeEnd],
        trace: [Function: bound trace],
        assert: [Function: bound assert],
        Console: [Function: Console] 
    }
    */
    log:(data)=>{
        console.log(colors.rainbow(data));
    },
    info:(data)=>{
        console.info(colors.green(data));
    },
    debug:(data)=>{
        // nodejs 不提供该方法，赞由自己用 console.log 来替代使用
        console.debug(colors.blue(data));
    },
    error:(data)=>{
        // 用于输出错误信息
        console.error(colors.red(data));
    },
    dirxml:(data)=>{
        // 显示 dom节点的树结构
        console.dirxml(colors.blue(data))
    },
    trace:(data)=>{
        // 堆栈跟踪
        console.trace(colors.bgRed(data))
    },
    count:(n)=>{
        // 显示函数被执行多少次，可以自加
        console.count(colors.bgRed(n))
    },
    dir:(obj)=>{
        // 打印出对象的 完整结构，除函数内容
        console.dir(colors.blue(obj))
    },
    assert:(data)=>{
        // 调试语句，表达式为 false 才打印
        console.assert(colors.bgRed(data))
    },
    time:(t) =>{
        // 计时开始,对应有个 结束计时 timeEnd
        console.time(colors.bgBlack(t))
    },
    timeEnd:(t)=>{
        // 计时结束,对应有个 开始计时 time
        console.timeEnd(colors.bgBlack(t))
    },
}

module.exports = print


