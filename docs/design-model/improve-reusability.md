# 提高复用性

## 提高复用性的目的


- 遵循DRY原则（Don't Repeat Yourself）
- 减少代码量，节省开销

## 什么是好的复用


- 对象可以重复使用，不用修改
- 重复代码少
- 模块功能单一（低耦合）

## 减少代码数量，高效复用代码的设计模式


- 桥接模式
  - 目的：通过桥接代替耦合。
  - 应用场景：减少模块之间的耦合。
- 享元模式
  - 目的：减少对象/代码数量。
  - 应用场景：当代码中创建了大量类似的对象和类似的代码块。
  - 要点：保留公用的代码逻辑，将需要改变的代码抽取成公共享元，通过参数来控制。
- 模板方法模式
  - 目的：定义一系列操作的骨架，简化后面类似操作的内容。
  - 应用场景：当项目中出现很多类似操作内容。

## 基本结构示例


### 享元模式的基本结构

```js
  // 有一百种不同文字的弹窗，每种弹窗行为相同，但是文字和样式不同，
  // 只需要一个类，不需要new100次弹窗。
  // 这个类只保留所有弹窗共有的，每个弹窗不同的部分留作一个公共享元。

  function pop() {}
  // 保留相同的部分
  pop.prototype.action = function() {}
  // 显示弹窗
  pop.prototype.show = function(config) {
    const text = config.text || '';
    const color = config.text || 'green';
  }
  // 提取出每个弹窗不同的部分作为一个外部数组。
  const arr = [
    {
      text: '文本1',
      color: 'green',
    },
    {
      text: '文本2',
      color: 'red',
    }
  ];
  const popup = new pop();
  arr.forEach((item) => {
    popup.show(item)
  });
``` 

### 桥接模式的基本结构

```js
  // 有3种形状，每种形状都有3种颜色
  // 对于这个需求，可以将颜色实现逻辑单独实现
  function showColor(color) {}
  function rect(color) {
    showColor(color);
  }
  function circle(color) {
    showColor(color);
  }
  function delta(color) {
    showColor(color);
  }

  new circle('green');
```

### 模板方法模式的基本结构

```js
  // 编写导航组件，功能和展示都可能各不相同。
  // 导航组件多种多样，可能后面还会新增类型，因此可以先写一个基础的组件类，
  // 具体的实现，延迟到具体的使用时再去实现。
  function baseNav() {
    // 基础类，此处定下基本框架
  }
  function isFunction(fn) {
    return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]';
  }
  baseNav.prototype.action = function(fn) {
    // 特异性的处理，留出一个回调等待具体实现
    if (isFunction(fn)) {
      fn();
      return;
    }
    // 执行自有方法
  }
```

### 享元模式的应用示例

```js
  // 需求：项目中有一个文件上传功能，该功能可以上传多个文件。
  //文件上传
  // function uploader(fileType,file){
  //   this.fileType=fileType;
  //     this.file=file;
  // }
  // uploader.prototype.init=function(){
  //   //初始化文件上传的html
  // }
  // uploader.prototype.delete=function(){
  //   //删除掉该html
  // }
  // uploader.prototype.uploading=function(){
  //   //上传
  // }
  // var fileob1,fileob2;
  // new uploader('img', fileob1);
  // new uploader('txt', fileob2);

  // 使用享元模式
  function uploader(){}
  uploader.prototype.init = function(){
    //初始化文件上传的html
  }
  uploader.prototype.delete = function(){
    //删除掉该html
  }
  // 公共享元
  uploader.prototype.uploading = function(filetype,file){
    // 上传
  }
  var data=[
    {
      type: 'img',
      file: fileob1,
    },
    {
      type: 'txt',
      file: fileob2,
    },     
  ];

  const uploader = new uploader();
  for(let i = 0; i < data.length; i++){
    uploader.uploading(data[i].type, data[i].file);
  };
```

### 桥接模式的示例

```js
  // 需求：创建不同的选中效果，有一组菜单，上面每种选项，都有不同的选中效果。

  function menuItem(word, color) {
    this.word = word;
    this.dom = document.createElement('div');
    this.dom.innerHTML = this.word;
    this.color = color;
  }
  function menuColor(colorover, colorout) {
    this.colorover = colorover;
    this.colorout = colorout;
  }

  menuItem.prototype.bind = function() {
    var self = this;
    this.dom.onmouseover = function() {
      console.log(self.color);
      this.style.color = self.color.colorover;
    }
    this.dom.onmouseout = function() {
      this.style.color = self.color.colorout;
    }  
  }

  const data=[
    {
      word: 'menu1',
      color: ['red', 'black']
    },
    {
      word: 'menu2',
      color: ['green', 'black']
    },
  ];
  for(let i = 0; i < data.length; i++) {
    new menuItem(data[i].word, new menuColor(data[i].color[0], data[i].color[1])).bind();
  }
```
```js
  // 需求：Express中创建get等方法。express中有get、post等方法，如何方便快速的创建

  const methods=['get', 'post', 'delete', 'put'];
  methods.forEach(function(method) {
    app[method] = function() {
      route[method].apply(route, slice.call(arguments, 1));
    }
  });

  // methods.forEach(function(method) {
  //   Route.prototype[method] = function() {
  //     var handles = flatten(slice.call(arguments));

  //     for(let i = 0; i < handles.length; i++) {
  //       var handle = handles[i];
  //       if (typeof handle !== 'function') {
  //         var type = toString.call(handle);
  //         var msg = `Route.${method}() requires a callback function but get a ${type}`;
  //         throw new Error(msg);
  //       }

  //       debug('%s %o', method, this.paht);
        
  //       var layer = Layer('/', {}, handle);
  //       layer.method = method;

  //       this.methods[method] = true;
  //       this.stack.push(layer);
  //     }

  //     return this;
  //   };
  // });
```

### 模板方法模式的示例

```js
  // 需求：项目有一系列弹窗，每个弹窗的行为、大小、文字都不同。
  // 模板方式模式的继承实现思路
  function basePop(word, size) {
    this.word = word;
    this.size = size;
    this.dom = null;
  }
  basePop.prototype.init = function() {
    const div = document.createElement('div');
    div.innerHTML = this.word;
    div.style.width = `${this.size.width}px`;
    div.style.height = `${this.size.height}px`;
    this.dom = div;
  }
  basePop.prototype.hidden = function() {
    this.dom.style.display = 'none';
  }
  basePop.prototype.confirm = function() {
    this.dom.style.display = 'none';
  }

  function ajaxPop(word, size) {
    basePop.call(this, word, size);
  }
  ajaxPop.prototype = new basePop();

  var hidden = ajaxPop.prototype.hidden;
  ajaxPop.prototype.hidden = function() {
    hidden.call(this);
    console.log(1);
  }
  var confirm = ajaxPop.prototype.confirm;
  ajaxPop.prototype.confirm = function() {
    confirm.call(this);
    $.ajax();
  }
```

```js
  // 需求：现在我们有一系列自己的算法，但是这个算法在不同的地方需要添加一些不同的操作。
  // 模板方式模式的组合实现思路

  function counter() {
    this.beforeCounter = [];
    this.afterCounter = [];
  }

  counter.prototype.addBefore = function(fn) {
    this.beforeCounter.push(fn);
  }
  counter.prototype.addAfter = function(fn) {
    this.afterCounter.push(fn);
  }
  counter.prototype.count = function() {

    // 基础操作
    function baseCount(num) {
      num += 4;
      num *= 4;
      return num;
    }

    var _resultNum = num;
    var _arr = [baseCount];

    // 构造完整的执行方法队列
    _arr = this.beforeCounter.concat(_arr);
    _arr = _arr.concat(this.afterCounter);
    
    while(_arr.length > 0) {
      _resultNum = _arr.shift()(_resultNum);
    }
    return _resultNum;
  }

  // 使用
  var countObject = new counter();
  countObject.addBefore(() => {
    num--;
    return num;
  });
  countObject.addAfter(() => {
    num *= 2;
    return num;
  });
  countObject.count(10);
```

## JavaScript的组合与继承


- 组合
  - JavaScript最初没有专门的继承，所以最初JavaScript推崇函数式的编程，
    然后进行统一组合桥接到一起。
  - 桥接模式可以看出组合的一种体现，组合的好处是耦合低，方便方法复用，方便扩展。
- 继承
  - 在ES6出现class和extend，继承的方式多种多样，但是都是各有弊端。
  - 模板方法模式可以看出继承的一种体现，继承的好处是可以自动获得父类的内容与接口，
    方便统一化    
- 最佳实践
  - 优先使用组合，其次才考虑继承。

## 小结


- 桥接模式
  - 通过独立方法间的桥接来形成整体功能，这样每个方法都可以被高度复用。
- 享元模式
  - 提取出公有部分与私有部分，私有部分作为外部数据传入。从而减少对象数量。
- 模板方法模式
  - 当一个功能朝着多样化发展，不妨先定义一个基础的方法，把具体实现延迟到后面。
