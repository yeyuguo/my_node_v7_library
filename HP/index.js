// 参考文章:https://cnodejs.org/topic/571e0c445a26c4a841ecbcf1
/* 
所有的参数都 依次传入性能高，别用数组传入
*/

/* 
创新新的对象 {}
*/
function emptyObject(){}
emptyObject.prototype = Object.create(null)

/* 
数组去除一个元素 
*/
function spliceOne(array,index){
    for (var i = index, k = i + 1, n = array.length; k < n; i += 1, k += 1)
        array[i] = array[k];
    array.pop();
}
/*
IIFE 性能函数
*/
function IIFE(fn){
    return (function(){
        var args = [].slice.call(arguments,1)
        return new fn(args)
    })()
}

/* 
公共模块
*/
exports = module.export = {
    Object:function(){
        return new emptyObject()
    },
    spliceOne:spliceOne,
    IIFE:IIFE
}