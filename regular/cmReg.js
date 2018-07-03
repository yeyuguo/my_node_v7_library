/**正则基础分类 */


/**
 * - ip地址的正则  
 * 1.1.1.1 - 255.255.255.255
 * 先找 单个数的正则： ( ([2][0-5]{2})|([1][0-9]{2})|([0-9]{1,2}) )\.   => 2xx|1xx|xx
 * 组合起来
 * /((([2][0-5]{2})|([1][0-9]{2})|([0-9]{1,2}))\.){3}(([2][0-5]{2})|([1][0-9]{2})|([0-9]{1,2}))/gm
 * 
 */

const ip_reg = /^((([2][0-5]{2})|([1][0-9]{2})|([0-9]{1,2}))\.){3}(([2][0-5]{2})|([1][0-9]{2})|([0-9]{1,2}))$/gm


/**
 * - 手机号码
 * 
中国电信号段
133, 149, 153, 173, 177, 180, 181, 189, 199
中国联通号段
130, 131, 132, 145, 155, 156, 166, 171, 175, 176, 185, 186
中国移动号段
134(0-8), 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188, 198
其他号段
14号段以前为上网卡专属号段，如中国联通的是145，中国移动的是147等等。
虚拟运营商
电信：1700, 1701, 1702
移动：1703, 1705, 1706
联通：1704, 1707, 1708, 1709, 171
卫星通信：1349

首: 1 
二: 3,4,5,7,8
三: 1,2,3,4,5,6,7,8,9
 */
const phone_reg = function(type){
    let _reg = '',
        _len = 3
    switch(type){
        case '移动':
        // ! 特殊情况先不考虑
            // _reg = [134|134[0-8], 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188, 198]
            _reg = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188, 198]
        break;
        case '电信':
            _reg = [133, 149, 153, 173, 177, 180, 181, 189, 199]
        break;
        case '联通':
            _reg = [130, 131, 132, 145, 155, 156, 166, 171, 175, 176, 185, 186]
        break;
        case '移动虚拟':
            _reg = [1703, 1705, 1706]
            _len = 4
        break;
        case '电信虚拟':
            _reg = [1700, 1701, 1702]
            _len = 4
        break;
        case '联通虚拟':
            _reg = [1704, 1707, 1708, 1709]
            _len = 4
        break;
        case '卫星通信':
            _reg = [1349]
            _len = 4
        break;
    }
    let three = _reg.join('|')
    
    // const reg = `/(${three})[0-9]{${ 11 - _len }}$/gm`
    const reg = `/^(\\+86)?(${three})[0-9]{${ 11 - _len }}$/gm`
    console.log('reg: ', typeof reg);

    return function(phoneNum){
        return eval(reg).exec(phoneNum)
    }
}




/**
 * - 身份证
 * 
 */


if( require.main == module){
    // console.log('phone_reg(): ', phone_reg('移动'));
    let regs = phone_reg('移动')
    console.log("regs('13542342442'): ", regs('13542342442'));
}


/** - 域名获取
 * 获取 二级 域名
 * reg =  /^http(s)?:\/\/(\w*\.|^\s)*(.*?)\.(com|w*)/gm
 */


const domain_reg = /^http(s)?:\/\/(\w*\.|^\s)*(.*?)\.(com|\w*)$/gm