const fs = require('fs')
const iconv = require('iconv-lite');

var print = require('../Print')
const decode = {
    gbk:(bin_content)=>{
        // 参考文章：https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding
        // var bin = fs.readFileSync(path_file);
        var buff = new Buffer(bin_content)
        return iconv.decode(buff, 'gbk');
    },
    common:(path_file,dir_file,cb)=>{
        // TODO  会有乱码
        /*
        文件转换，并操作
        读入写入，都以 字节码的形式来转换
        参考文章：http://wiki.jikexueyuan.com/project/nodejs-guide/text-encoding.html
        */ 
        var str = fs.readFileSync(path_file, 'binary');
        print.info(str)
        print.error(decode.gbk(str))
        // str = str.replace('foo', 'bar');
        if(cb && typeof cb =='function'){
            /*
            此回调必须是同步的，
            1.ES6 实现： Generator，参考文章：http://www.ruanyifeng.com/blog/2015/04/generator.html
            2.ES7 实现： Promise && async 参考文章： https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
            */ 
            var g = cb(str)  // 函数体内返回了 yield
            var generator_object = g.next()
            /*
            generator_object = {
                value:'value',
                done:'true' // 为 true 时 结束
            }
            */
            while(generator_object.done == false){
                generator_object = g.next()
            }
            str = generator_object.value

            // print.info(str)
        }
        typeof str == 'string' ? fs.writeFileSync(dir_file?dir_file:path_file, str, 'binary') : print.dir(str)
    }
}



decode.common('./test.json','./test.json',function* (data){
    var data = data.replace(/1/g,'替换掉的字符')
    yield data
})
module.exports = decode
