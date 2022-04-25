# 提高代码质量

## 提高代码质量的目的


- 高质量的代码，方便进行后续的一切操作
- 方便他人阅读

## 什么是代码质量


- 代码整洁
- 结构规整，没有漫长的结构
- 阅读起来好理解（命名规范）

## 优化代码结构的设计模式


- 策略模式/状态模式
  - 目的：优化if-else分支
  - 应用场景：当代码if-else分支过多时
  - 区别：策略模式一般用于单线判断。状态模式一般用于多状态判断。
- 外观模式
  - 目的：通过为多个复杂的子系统提供一个一致的接口
  - 应用场景：当完成一个操作，需要操作多个子系统时，不如提供一个更高级的接口。（操作子系统可以细化为更小的字接口）

## 优化代码操作的设计模式


- 迭代器模式
  - 目的：不访问内部的情况下，方便地遍历数据
  - 应用场景：当我们要对某个对象进行操作，但是又不能暴露内部
- 备忘录模式
  - 目的：记录状态，方便回滚
  - 应用场景：系统状态多样，为了保证状态的回滚方便，记录状态

## 基本结构示例


### 策略模式的基本结构
```js
  // 假设要编写一个计算器，有加减乘除，我们可以把一层一层的if判断，封装成一个个策略。
  function showControll(, a, b) {
    this.status = '';
    this.power = {
      boss: function(a, b) {
        return a + b;
      },
      minus: function(a, b) {
        return a - b;
      },
      division: function(a, b) {
        return a / b;
      },
    };
    this.power[](a, b);
    this.status = '';
  }
```

### 状态模式的基本结构

```js
  // 为了减少if-else结构，将判断变成对象内部的一个状态，通过对象内部的状态改变，让其拥有不同行为
  function stateFactor(state) {
    var stateObject = {
      _status: '',
      state: {
        state1: function() {},
        state2: function() {},
      },
      run: function() {
        return this.state[this._status]();
      },
    };
    stateObject._status = state;
    return stateObject;
  }

  stateFactor('state1').run();
```

### 外观模式的基本结构

```js
  // 我们在组织方法模块时，可以细化多个接口，但是我们给别人使用时，要合为一个接口，就像你
  // 可以直接去餐厅点套餐。
  
  // 模块1
  function Model1() {}
  // 模块2
  function Model2() {}
  // 功能由Model1获取Model2的结果来完成
  function use() {
    Model2(Model1());
  }
```

### 迭代器模式的基本结构

```js
  // 在不暴露对象内部结构的同时，可以顺序得访问对象内部，可以帮助我们简化循环，简化数据操作

  function Iterator(item) {
    this.item = item;
  }
  Iterator.proto.dealEach = function(fn) {
    this.status = '';
    for (let i = 0; i < this.item.length; i++) {
      fn(this.item[i], i);
    }
  }
```

### 备忘录模式的基本结构

```js
  // 记录对象内部的状态，当有需要时，回滚到之前的状态或者方便对象使用
  function Memento() {
    var cache = {};
    return function(cacheName) {
      if (cache[cacheName]) {
        // 有缓存的操作
      } else {
        // 没缓存的操作
      }
    };
  }

  var MementoFn = Memento();
  Memento('xxx');
```

### 策略/状态模式的示例

```js
  // 动态的内容 需求：项目有一个动态的内容，根据用户权限的不同显示不同的内容

  function showPart1() {}
  function showPart2() {}
  function showPart3() {}

  function showControll() {
    this.status = '';
    this.power = {
      boss: function() {
        showPart1();
        showPart2();
        showPart3();
      },
      manner: function() {
        showPart1();
        showPart2();
      },
      staff: function() {
        showPart3();
      },
    };
  }
  showControll.prototype.show = function() {
    var self = this;
    axios.get('xxx').then((res) => {
      self.status = res;
      self.power[self.status]();
    })
  };

  new showControll().show();
```

```js
  // 复合运动 需求：有一个小球，可以控制它左右移动，或者左前，右前等方式移动
  function moveLeft() {
    console.log('left');
  }
  function moveRight() {
    console.log('right');
  }
  function moveTop() {
    console.log('top');
  }
  function moveBottom() {
    console.log('bottom');
  }
  function mover() {
    this.status = [];
    this.actionHandle = {
      left: moveLeft,
      right: moveRight,
      top: moveTop,
      bottom: moveBottom,
    };
  }
  mover.portotype.run = function() {
    this.status = Array.prototype.slice.call(arguments);
    this.status.forEach((action) => {
      this.actionHandle[action]();
    })
  };

  new mover().run('left', 'right');
```

### 外观模式的示例

```js
  // 插件封装的规律 需求：插件基本上都会给最终使用提供一个高级接口

```
