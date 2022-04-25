# 关于this

`this` 是很多人会混淆的概念，但是其实它一点都不难，只是网上很多文章把简单的东西说复杂了。在这一小节中，你一定会彻底明白 `this` 这个概念的。

## 普通函数调用场景


### 我们先来看几个函数调用的场景

```javascript
function foo() {
  console.log(this.a);
}
var a = 1
foo();

const obj = {
  a: 2,
  foo: foo,
};
obj.foo();

const c = new foo();
```

### 接下来我们一个个分析上面几个场景

对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`
对于 `obj.foo()` 来说，我们只需要记住，**谁调用了函数，谁就是** `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`。


## 箭头函数调用场景


说完了以上几种情况，其实很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

### 代码示例

```javascript
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```
### 解析

首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` **只取决包裹箭头函数的第一个普通函数**的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。

另外对箭头函数使用 `bind` 这类函数是无效的。

## 改变上下文的API的调用场景


最后种情况也就是 `bind` 这些改变上下文的 `API` 了，对于这些函数来说，`this` **取决于第一个参数**，如果第一个参数为空，那么就是 `window`。

### 例子

```javascript
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

var boundGetX1 = retrieveX.bind(module);
boundGetX1(); // 9
```

### 扩展

那么说到 `bind`，不知道大家是否考虑过，如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```javascript
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```

如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式
```javascript
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```
可以从上述代码中发现，不管我们给函数 `bind` 几次，fn 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`。
```javascript
let a = { name: 'aaa' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'yck'
```

## 总结


以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。

如果你还是觉得有点绕，那么就看以下的这张流程图吧，图中的流程只针对于单个规则。

![](../.vuepress/assets/img/base-js/about-this/this.png)
