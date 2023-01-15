---
title: pointer-events
order: 1
date: 2023-01-15
index: false
---

## 属性说明

`pointer-events` CSS属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的`target`。
本文主要针对`pointer-events`取值为`none`的情况进行相关说明，即：
```html
pointer-events: none;
释：元素永远不会成为鼠标事件的`target`。但是，当其后代元素的pointer-events属性指定其他值时，
鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
```

关于`pointer-events`的更详细说明可以参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)


## 兼容性

![](/assets/docs/base-css/caniuse-pointer-events.jpg)
详见 [caniuse](https://caniuse.com/?search=pointer-events)

## 使用场景示例

### 禁用鼠标点击事件

::: vue-playground 禁用鼠标点击事件 交互演示

@file App.vue

```vue
<script setup>
import { ref } from "vue";

</script>

<template>
  <a href="javascript:">button1</a>
  <a class="pointer-events-none">button2</a>
  <a href="javascript:">button3</a>
</template>

<style>
  .pointer-events-none {
    pointer-events: none;
  }
</style> 
```

:::


### 实现列表首尾半透明覆盖

## 缺陷及优化

### 无法禁用键盘事件
