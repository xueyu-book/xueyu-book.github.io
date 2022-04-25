# 封装与对象

## 封装目的


- 定义变量时不会污染外部
- 能够作为一个模块调用
- 遵循开闭原则

## 什么是好的封装


- 保证内部变量外部不可见，即外部不可直接调用内部变量。
- 留出给外部调用的接口
- 留出扩展接口
- 要义：不可见，留接口

## 封装对象时可以使用的设计模式

### 创建一个对象的模式

- 工厂模式
  - 目的：方便我们大量创建拥有共性的对象
  - 应用场景：当某一个对象需要经常创建的时候（分页器、弹窗）
- 建造者模式
  - 目的：需要组合出一个全局的精细化对象
  - 应用场景：当要创建单个、庞大的组合对象时

### 保障对象只有一个的设计模式

- 单例模式
  - 目的：需要确保全局只有一个对象
  - 应用场景：为了避免重复新建，避免多个对象存在互相干扰

## 基本结构示例


### 工厂模式的基本结构

- 工厂模式就是写一个工厂方法，只需要调用这个方法，就能拿到你要的对象
- 举个🌰
  ```js
    function Factory(type) {
      switch (type) {
        case 'type1':
          return new Type1();
        case 'type2':
          return new Type2();  
      }
    }
  ```

### 建造者模式的基本结构

- 把一个复杂的类的各个部分，拆分成独立的类(低耦合)，然后再在最终类里组合成一个类
- 举个🌰
  ```js
    // 模块1
    function Mode1() {}
    // 模块2
    function Mode2() {}
    // 最终的使用类
    function Final() {
      this.mode1 = new Mode1();
      this.mode2 = new Mode2();
    }
  ```

### 单例模式的基本结构

- 通过定义一个方法，使用时只允许通过此方法拿到存在内部的同一实例化对象
- 举个🌰
  ```js
    let Singleton = function(name) {
      this.name = name;
    }
    Singleton.getInstance = function(name) {
      // 是否已存在instance属性
      if (this.instance) {
        return this.instance;
      }
      return this.instance = new Singleton(name);
    }
  ```


### 工厂模块示例

```js
  // 需求：项目有一个弹窗需求，弹窗有多种，他们之间存在内容和颜色上的差异

  // function infoPop() {}
  // function confirmPop() {}
  // function cancelPop() {}

  // function popFactory(config) {
  //   const type = config.type || 'infoPop';
  //   const content = config.content || '我是弹窗内容';
  //   const color = config.color || 'green';
  //   switch (type) {
  //     case 'infoPop':
  //       return new infoPop(content, color);
  //     case 'confirmPop':
  //       return new confirmPop(content, color);
  //     case 'cancelPop':
  //       return new cancelPop(content, color);
  //   }
  // }

  function popFactory(config) {
    const type = config.type || 'infoPop';
    const content = config.content || '我是弹窗内容';
    const color = config.color || 'green';
    // 兼容直接调用popFactory
    if (this instanceof popFactory) {
      return new this[type](content, color);
    } else {
      return new popFactory(type, content, color);  
    }
  }
  popFactory.prototype.infoPop = function() {
    console.log('infoPop');
  }
  popFactory.prototype.confirmPop = function() {
    console.log('confirmPop');
  }
  popFactory.prototype.cancelPop = function() {
    console.log('cancelPop');
  }

  // 执行
  var popList = [
    {
      type: 'infoPop',
      content: '空',
      color: 'red',
    },
    {
      type: 'confirmPop',
      content: '空',
      color: 'red',
    },
    {
      type: 'cancelPop',
      content: '空',
      color: 'red',
    },
    {
      content: '空',
      color: 'red',
    },
  ];

  popList.forEach((item)=>{ new popFactory(item)})
  popList.forEach((item)=>{ popFactory(item)})
```

```js
  // JQuery 需要操作dom, 每一个dom都是一个jq对象
  (function(){
    var jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }
    jQuery.fn = jQuery.prototype={
      init:function(){}
    }
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {}
    jQuery.extend({});
    window.$ = jquery;
  })();
```

### 建造者模式示例

```js
  // 需求：有一个编辑器插件，初始化的时候需要配置大量参数，而且内部功能很多
  function Editor() {
    this.initer = new initHTML();
    this.styleControll = new styleControll();
    this.stateControll = new stateControll();
  }

  function initHTML() {}
  initHTML.prototype.initStyle = function() {}
  initHTML.prototype.renderDom = function() {}

  function styleControll() {}
  styleControll.prototype.changeColor = function() {}
  styleControll.prototype.changeFontsize = function() {}

  function stateControll() {
    this.state = [];
    this.nowState = 0;
  }
  stateControll.prototype.saveState = function() {}
  stateControll.prototype.stateBack = function() {
    const state = this.state[this.nowState - 1];
    this.styleControll.changeColor(state.color);
  }
  stateControll.prototype.stateGo = function() {}
```

```js
  // Vue的初始化
  function Vue(options) {
    if (!(this instanceof Vue)) {
      console.warn('使用new 操作符');
      return;
    }
    this._init(options);
  }
  // initMixin(Vue);
  // steteMixin(Vue);
  // eventsMixin(Vue);
  // lifecycleMixin(Vue);
  // renderMixin(Vue);
```

### 单例模式的示例

```js
  // 写一个数据储存对象。需求：项目中有一个全局的数据储存者，
  // 这个储存着只能有一个，不然会需要进行同步，增加复杂度。
  function store() {
    if (store.install) {
      return store.install;
    }
    this.store = {};
    store.install = this;
  }
  store.install = null;

  var s1 = new store();
  var s2 = new store();
  s1.store.a = 1;
  console.log(s2);
```

```js
  // 需求：vue-router必须保障全局有且只有一个，否则的话会错乱。
  let _Vue;
  function install(Vue) {
    if (install.installed && _Vue === vue) return;
    install.installed = true;
    _Vue = vue;
  }

  vue.use();
```

## 小结

- 工厂模式使用场景：如果你写的模块，需要大量创建类似对象。
- 建造者模式使用场景：需要创建一个需要大量参数，且内部模块庞大的对象。
- 单例模式使用场景：防止重复注册，防止有多个对象互相干扰。
