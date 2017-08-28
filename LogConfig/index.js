var log4js = require('log4js');
// http://www.cnblogs.com/chenjianxiang/p/6183277.html
log4js.configure({
    "appenders":{
        console:{
            "type": "console",
            // "category": "console"
        },
        record:{
            "type" : "dateFile",
            "filename" : "../logs/",
            absolute:true,
            "pattern" : "yyyy-MM-dd.log",
            "alwaysIncludePattern" : true,
            // "category" : "record"
        }
    },
    categories: { default: { appenders: ['console','record'], level: 'all' } },
})

// 引用： logger = require('...').logger
exports.logger  = log4js.getLogger('record')
/*
https://github.com/nomiddlename/log4js-node
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
*/
/*
 为了和 express 使用
使用方式：log4js.use(app);
*/
// exports.use = function(app) {
//     app.use(log4js.connectLogger(consoleLog, {level:'INFO', format:':method :url'}));
// }