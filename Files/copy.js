var fs = require('fs')
const chalk = require('chalk'); //https://github.com/chalk/chalk
const colors = require('colors') // 有多个颜色值 
const logger = require('../LogConfig').logger
const print = require('../Print')

var _big_file = Symbol('该函数为大文件做copy')
var _small_file = Symbol('该函数为小文件做copy')

var copy = {
    _small_file:function(src,dst){
        /*
        小文件一次读入到内存中
        */
        try{
            var file_content = fs.readFileSync(src,{encoding: 'utf8'});
            fs.writeFileSync(dst,file_content);
            print.success('copy is success')
        }catch(e){
            var msg = chalk.red('copy 命令运行命令有异常;')
            logger.debug(msg)
            print.error(e)
        }
    },
    _big_file:function(src,dst){
        try{
            var file_content = fs.createReadStream(src)
            file_content.pipe(fs.createWriteStream(dst))
            // 必须分开写，否则监测 error 的函数会报错
            file_content.on('error',function(e){
                print.error(e)
                logger.debug(e)
            })
            file_content.on('close',function(){
                print.success('copy is success')
            })
            
        }catch(e){
            var msg = chalk.red('copy 命令运行命令有异常;')
            logger.debug(e)
        }
    },
    main:function(object){
        
        // log(colors.rainbow(logger))
        /*
        {
            src:'',  //源文件
            dst:'',  //复制到的目标路径
            small   // 判断是否为小文件
        }
        由于 argv[0] 固定等于 NodeJS 执行程序的绝对路径，argv[1] 固定等于主模块的绝对路径，因此第一个命令行参数从 argv[2] 这个位置开始。
        */
        var flag = Symbol('标记是大文件还是小文件');
        // flag = arguments[2]
        // if(flag && flag == 'small'){
        //     this._small_file(arguments[0],arguments[1])
        // }else{
        //     this._big_file(arguments[0],arguments[1])
        // }
        
        flag = object.small
        if(flag && flag == 'small'){
            this._small_file(object.src,object.dst)
        }else{
            this._big_file(object.src,object.dst)
        }
    }
}

// print.info(copy._big_file)

copy.main({
    src:process.argv.slice(2)[0],
    dst:process.argv.slice(2)[1],
    small:process.argv.slice(2)[2]
});

// exports.copy.main(process.argv);
module.exports = copy
