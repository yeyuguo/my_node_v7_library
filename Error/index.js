const colors = require('colors')
const logger = require('../LogConfig').logger

/*
建立该模块的原因：
1.统一从此处来引入做日志记录；
2.可以对所有的错误信息，走一个统一的处理；
*/
var errors = {
    // error:null,
    print_err:function(error){
        console.log(colors.red(error));
    },
    return_err:function(error){
        if(error){
            logger.debug(error)
            return error;
        }
    },
    return_false:function(error){
        // 针对节点判断，需要返回 false
        if(error){
            logger.debug(error)
            return false;
        }
    }
}


module.exports = errors