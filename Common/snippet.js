// 参考文章：http://www.css88.com/30-seconds-of-code/#flip



/**
 * 函数顺序执行
 * 下一个函数的参数是上一个函数的返回值
 * 用途：
 * @param {any} fns 数组
 * @returns any
 * es5
 */
function pipeFunctions(...fns){
    // if(!(fns instanceof Array)){
    //     fns = Array.prototype.slice.call(fns)
    // }
    return fns.reduce(function(preResult,current){
        return function(...args){
            return current(preResult(...args))
        }
    })
}

// es6
var pipeFunctions = (...fns) => fns.reduce( (f, g) => (...args) => g( f(...args) ) )

// 例子
// const add5 = x => x + 5;
// const multiply = (x, y) => {
//     return x * y
// }
// const multiplyAndAdd5 = pipeFunctions(multiply, add5);
// console.log('multiplyAndAdd5(5, 2): ', multiplyAndAdd5(5, 2));


/**把一个函数转化成 promise执行
 * 用途：redux 的 action 就可以利用这个方式得到 promise 来去除副作用 
 * 利用科里化函数式编程转换
 * */
// es5
function promisify(fn){
    return function(){
        let args = arguments
        return new Promise(function(resolve,reject){
            return fn(...args, function(err, result){
                return err ? reject(err) : resolve(result)
            })            
        })
    }
}

// es5
var promisify = fn => {
    return (...args) => {
        return new Promise((resolve, reject)=>{
            return fn(...args, (err, result)=>{
                err ? reject(err) : resolve(result)
            })
        })
    }
}



// 例子1：
// const delay = promisify((d, cb) => setTimeout(cb, d));
// delay(2000).then(() => console.log('Hi!'));

// 例子2
// todo 测试不通过
// const delay = promisify((d, cb) => setTimeout(cb, d));
// const syn = async function(){
//     const result = await delay(2000,function(){
//         return 'hahahah'
//     })
//     console.log('result: ', result);
//     return result
// }
// console.log('syn(2000): ', syn(2000));


/**
 * 数组函数，依次执行里面的异步函数
 * 用途：多个异步函数同步执行
 * @param {array} fns  数组函数
 * 
 * 利用闭包，长期保存了局部变量 current 的值
 * 
 * ES5
 */
function chainAsync(fns){
    let current = 0;
    const next = function(){
        return fns[current++](next)
    }
    next()
}


/**ES6 */
var chainAsync = fns => {
    let current = 0;
    const next = () => fns[current++](next)
    next()
}



// 例子
// chainAsync([
//     next => setTimeout(()=>{console.log('11111');next()}, 1000),
//     next => console.log('2222')
// ])

/**
 * 依次从右到左执行函数
 * 右边函数的 结果 是左边函数的 参数
 * 用途：
 * @param {any} fns 
 * @returns result
 */
// ES5
function compose(...fns){
    return function(...args){
        console.log('fns: ', fns);
        return fns.reduce(function(pre,current){
            console.log('pre,current: ', pre,current);
            return pre(current(...args))
        })
    }
}

// ES6
// 自己实现
var compose = (...fns) => (...args) => fns.reduce((pre,current)=> pre(current(...args)))
// 原文实现
var compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

// 例子
// const add5 = x => x + 5;
// const multiply = (x, y) => x * y;
// const multiplyAndAdd5 = compose(add5, multiply);
// // console.log('multiplyAndAdd5: ', multiplyAndAdd5);
// console.log('multiplyAndAdd5(5, 2);: ', multiplyAndAdd5(5, 2));


/**科里化 
 * 参数不够，可以重新传入参数之心
*/
function curry(fn, arity=fn.length, ...args){
    if( arity <= args.length ){
        return fn(...args)
    }else{
        return curry.bind(null, fn, arity, ...args)
    }
}

// !todo es6的实现还没完成，也还没理解该函数的定义

// 例子
// curry(Math.min)(2)(1)
// console.log('curry(Math.min,2)(1): ', curry( Math.min )(2)(1) );
// curry(Math.min,0)(2)(1)
// console.log('curry(Math.min,0)(2)(1): ', curry( Math.min, 0 )(2)(1)); // 报错



/**延迟执行某个函数 
 * 用途：
*/
// es5
function defer(fn,...args){
    setTimeout(fn,0,...args)
}

// es6
var defer = (fn, ...args)=>{
    setTimeout(fn, 0, ...args)
}

// 例子
// defer(console.log, 'a');
// console.log('b'); 


/**
 * 缓存一个对象
 * todo
 * 用途：存储一个对象在里面
 * 
 * @param {any} fn  
 * @returns fn
 */
function memoize(fn){
    const cache = new Map();
    const cached = function(val){
        return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val) && cache.get(val))
    }
    cached.cache = cache;
    return cached
}

// todo es6

// todo 例子


/**
 * 设置函数只能执行一次
 * 
 * @param {any} fn 
 * @returns 
 */
function once(fn){
    let called = false;
    return function(...args){
        if(called) return
        return fn.apply(this, ...args)
    }
}



// 例子
// function tt(){
//     this.a = 'tt a'
//     console.log(this)
// }

// global.a = 'window a'
// console.log( once(tt)() )


/**设置windows 的全局变量 
 * symbol
 */
function _symbol(key, ...args){
    if(arguments.length>1){
        window[Symbol.for(key)] = args
        return args
    }
    let _obj = window[Symbol.for(key)]  
    return _obj ? _obj : function(...args){
        return _symbol(key, ...args)
    }
}

// 例子：
// var key= 'hehe1', value = 'haha1'
// var aa = _symbol(key)
// // 有key 无value，返回函数
// console.debug('有key 无value，返回函数:', aa)
// // 传入 value 设置值
// console.debug('传入 value 设置值', aa(value))
// // 检测是否有值
// console.log('检测是否有值:', window[Symbol.for(key)])




/**
 * promise 数组，顺序执行 promise
 * 
 * @param {any} promise_fns 
 */
function runPromisesInSeries(promise_fns){
    if(!(promise_fns instanceof Array)){
        return 
    }
    Array.prototype.reduce.call( null, function(pre,next){
        pre.then(next)
    }, Promise.resolve())
    // promise_fns.reduce( function(pre,next){
    //     pre.then(next)
    // }, Promise.resolve() )       
}

// todo 未完成 例子 
// function test(data, resolve, ...args){
//     console.log('yes:', data)
//     return function(...args){
//         resolve(args)
//     }
// }

// const delay = fn => d => new Promise(function(resolve, reject){
//     console.log()
// })

