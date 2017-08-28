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



exports = module.export = {
    types : types,

}