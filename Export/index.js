// 参考文章：http://www.jb51.net/article/50743.htm

_ = function(module){
    if (module instanceof _) return module;
    if (!(this instanceof _)) return new _(module);
    this._wrapped = module;
}

if(typeof exports != 'undefined'){
    if(module !='undefined' && module.exports){
        exports = module.exports = _ 
    }
    exports._ = _
}else{
    root._ = _
}