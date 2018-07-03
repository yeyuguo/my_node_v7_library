

/**参考文章
 * http://www.alloyteam.com/2016/03/discussion-on-web-caching/
 * */ 


 /**按照优先级来排序 
 * !以 express 编程来实现的效果，不同框架，更改相应的接口参数
*/


/** 1⃣️ Cache-Control 字段 : repsonse 的 headers 的字段 
 * !设置上属性后，即使服务器资源变化，浏览器也不会得到通知，不会重新请求新文件
 * !cache-control 会覆盖 expires
 * Cache-Control 字段属性
 * !示例：Cache-Control: public, max-age=0, no-cache
*/


/** 1. 缓存最大有效时间
 * 浏览器的时间是 s，express 上 ms
 * 
 * @param {string|number} s 毫秒
 * @returns 
 * !示例：Cache-Control: max-age=10
 */
function MaxAge(s){
    return {
        'max-age': s,
    }
}

/** 2. 共享缓存 最大有效时间 (例如 CDN 缓存)
 * 浏览器的时间是 s，express 上 ms
 * 
 * @param {string|number} s 秒
 * @returns 
 * !示例：Cache-Control: s-maxage=10
 */
function sMaxage(s){
    return {
        's-maxage':s
    }
}


/** 3. 响应缓存 public | private
 * 没有制定 public 或 private，默认上 public
 * 
 * public 用户共享
 * todo 是如何实现的共享 ?
 * 浏览器 A用户 --- / —————— \ 
 *                |         |
 * 浏览器 B用户--> 缓存(缓存服务器) - -> 请求服务器资源
 *                |         |
 * 浏览器 C用户 --- \ ______ /
 * 
 * private 不能用户共享
 * 浏览器 A用户 -- 缓存 -- 请求服务器资源
 * 浏览器 B用户 -- 缓存 -- 请求服务器资源
 * 浏览器 C用户 -- 缓存 -- 请求服务器资源
 * 
 * 
*/

/** 4. no-cache 资源不缓存
 * !设置 no-cache 后，浏览器可能还是会缓存，该属性向服务器确认资源是否更改；
 * !防止缓存 : 只设置 no-cache 防止缓存不够保险，还需要加上 private + no-cache + expires(过期时间) === no-store
 * @param {any} isNoCache 
 * @returns 
 * !示例：Cache-Control: max-age=10, no-cache
 */
function noCache(isNoCache){
    return {
        'no-cache':false
    }
}


/** 5. no-store 资源绝对不缓存
 * 每次都会从服务器重新请求资源
 * 
 * @param {booler} isNoStore 
 * @returns 
 * !示例：Cache-Control: max-age=10, no-store
 */
function noStore(isNoStore){
    return {
        'no-store':false
    }
 }



 /** 6. must-revalidate 页面过期，从服务器重新获取,否则使用本地
  * !控制来自 缓存服务器 还是 浏览器缓存
  * 详细的设置参考文章：https://www.cnblogs.com/chyingp/p/no-cache-vs-must-revalidate.html
  * 
  * @returns 
  * !示例：Cache-Control: max-age=10, must-revalidate
  */
 function mustRevalidate(is){
     return {
         'must-revalidate':false
     }
 }



//  todo  使用 compose 和 柯里化 表达式，把上面的是 cache-control 属性全部串联起来；


/**2⃣️. Expires 字段 : 指定具体的 服务器上的资源 过期时间。 response 的 header 字段
 * Expires = max-age + 请求时间
 * !和 Last-modified 结合使用,优先级低于 Cache-Control
 * !示例：Expires: Mon, 11 Jun 2018 07:30:44 GMT
*/

function expires(datetime){
    return {
        'Expires':datetime
    }
}







/** 3⃣️  Last-modified 字段 
 * ! 该字段是 是否缓存的最根本之处，
 * ! web使用 If-Modified-Since 询问服务器资源 Last-Modified 时间点,决定是否重新请求资源
 * ! 示例： Last-Modified: Mon, 26 Feb 2018 07:15:40 GMT
 */
function lastModified(datetime){
    return {
        'Last-Modified':datetime
    }
}



/** 4⃣️ E-tag 字段
 * ! E-tag 执行过程
 * 1. 根据实体内容，由服务端产生 E-tag 的hash 字段；
 * 2. 浏览器第二次带着 E-tag hash 访问服务器资源，由服务器决定是否更新；
 * ! 为什么需要 E-tag
 * 1. 某些服务器不能得到资源最后的修改时间；
 * 2. 资源修改频繁， Last-modified 只能精准到 秒
 * 3. 最后修改时间变了，但内容没改变，使用 E-tag 避免资源重复请求；
 * 
 * !示例： ETag: W/"5a93b41c-1a57"
 */
// todo 
 function eTag(){

 }






 if(require.main == module){
     
 }