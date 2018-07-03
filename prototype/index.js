
function A(){
	this.a = 'A 函数 a 属性'
}

A.prototype.a = 'aaaa'

function B(){
	this.b = 'B 函数 b 属性 '
}

B.prototype.b = 'bbb'

A.prototype.__proto__ = B.prototype // 目的是为了实现继承效果
var aa = new A()


console.log(aa.a)
console.log(aa.b)
// 思考：为什么 原型可以实现这个过程；
console.log(A.prototype.__proto__.constructor)
console.log(A.prototype.__proto__.constructor.name)


