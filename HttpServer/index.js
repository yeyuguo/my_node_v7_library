const http = require('http')
const iconv = require('iconv-lite');
const zlib = require('zlib');
const print = require('../Print')

var port = process.env.port ||3000
// 转码问题： https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding
    // 该方法会报编码错误；
// http.get("http://website.com/", function(res) {
//     var body = '';
//     res.on('data', function(chunk) {
//         body += chunk;
//     });
//     res.on('end', function() {
//         var decodedBody = iconv.decode(body, 'win1252');
//         console.log(decodedBody);
//     });
// });

http.get("http://website.com/", function(req,res) {
    var chunks = [];
    req.on('data', function(chunk) {
        chunks.push(chunk);
    });
    req.on('end', function() {
        var decodedBody = iconv.decode(Buffer.concat(chunks), 'win1252');
        console.log(decodedBody);
    });
    
});



http.createServer(function(req,res){
    var header=res.headers;
    
    var chunks = [];
    req.on('data', function(chunk) {
        chunks.push(chunk);
    });
    req.on('end', function() {
        // var decodedBody = iconv.decode(Buffer.concat(chunks), 'utf-8');
        // console.log(decodedBody);
        chunks = Buffer.concat(chunks);
        // chunks = Buffer.concat(['哈哈哈'])
        print.log(chunks)

        // 对数据进行压缩
        if ((req.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
            zlib.gzip(chunks, function (err, data) {
                if(err){
                    res.end(err)
                    print.error(err)
                }
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Content-Encoding': 'gzip'
                });
                print.log('yes')
                res.end('haha')
                // res.end(data);
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            print.log('no')
            res.end('hehe')
            // res.end(chunks);
        }
    });

    
    // var htmlCont = iconv.decode(new Buffer(htmlCont), 'gbk');
    
    // var htmlCont = `此服务监听端口是 ${port}`
    // res.end(htmlCont)
}).listen(port)


