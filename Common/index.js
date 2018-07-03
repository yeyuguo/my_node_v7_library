/* 类型判断
 */
function types(typeData){
    if(typeof typeData !== 'object' ){
        // return `${typeData} is not 'object' type`
        return typeof typeData
    }
    _typeObj = Object.prototype.toString.call(typeData)
    return _typeObj.split(']').length > 1 ? _typeObj.split(']')[0].split(' ').length > 0 ? _typeObj.split(']')[0].split(' ')[1] : 'Object.prototype.toString.call 过滤类型的字符串有异常' : '不在 typeof 与 toString 类型判断范围内'
}

/**url 键值对 转成URL*/
function urlTrans(obj) {
    return obj ? Object.keys(obj).reduce((pre, key) => {
        pre == '' ? pre += '?' : pre += '&';
        var value
        if (types(obj[key]) != 'string') {
            value = JSON.stringify(obj[key])
        } else {
            value = obj[key]
        }
        return pre + `${key}=${value}`
    }, '') : ''
}


exports = module.export = {
    types : types,

}



if(require.main == module){
    console.log("urlTrans({a:1,b:2}): ", urlTrans({
        a:1,
        b:2
    }));
}