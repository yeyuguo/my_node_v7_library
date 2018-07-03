

function todo(){
    // 具体的业务工作
    /**argument 不是数组，而是一个对象
     * ! argument 不是数组，而是对象，截取顺序参数，需要转成数组
     */
    console.log( arguments)
    arguments = Object.create(arguments)
    console.log('Object.create(arguments): ', Object.getOwnPropertyNames(arguments));
    // console.log( arguments[1])
    let arguments_ary
    arguments_ary = Array.prototype.slice.call(arguments)
    console.log('arguments_ary: ', arguments_ary);
    
    return arguments_ary.reduce(function(sum, current){
        return sum + current
    },0)
}

/**
 * 把一个常规的回掉函数变成一个 promise 类的函数
 * 
 * @param {any} x 
 * @param {any} y 
 * @param {any} z 
 * @param {any} fn 
 */
function _toPromise(x,y,z,fn){
    const arguments_ary = Array.prototype.slice.call(arguments)
    return new Promise(function(resolve, reject){
        const args = arguments_ary.slice(0,-1)
        console.log({args})
        resolve(todo(arguments_ary))
    })
}



if( require.main == module ){
    // todo(1,2,3,4)
    // console.log('todo(1,2,3,4): ', todo(1,2,3,4));
    
    /**测试  _toPromise*/
    var tp = _toPromise(1,2,3,4);
    tp.then(function(data){
        console.log('hehe:',data)
    })
}