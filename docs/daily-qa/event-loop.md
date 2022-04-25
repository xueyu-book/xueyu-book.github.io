# 事件循环

## 定义

Event Loop是 user agent(浏览器)用于协调事件，用户交互(鼠标、键盘)，脚本（JS），
渲染（如HTML、CSS样式），网络等行为的一种机制。

## 任务的类型

任务分为宏任务(macrotask)和微任务(microtask)。
宏任务有：script、setTimeout/setInterval、setImmediate、I/O、UI rendering;
微任务有：Promise、Object.observe、MutationObserver、postMessage。

tips: 一个Event Loop有一个或多个任务队列，每个任务队列有一个微任务队列。

## Event Loop处理模型

- 步骤1: 判断当前任务队列是否为空。
- 步骤2: 如果为空，则执行步骤3。如果不为空，则执行任务队列中入栈最早的任务A，任务A执行完之后，继续执行步骤2。
- 步骤3: 将事件循环当前执行任务设置为 null。进入微任务队列，判断微任务队列是否为空。
- 步骤4: 如果为空，则执行步骤5。如果不为空，则执行微任务队列中入栈最早的任务A，任务A执行完之后，继续执行步骤4。
- 步骤5: 判断是否需要调用 requestAnimationFrame 重新渲染。
- 步骤6: 结束之后，返回继续执行步骤1。

## 图示

![](../.vuepress/assets/img/daily-qa/event-loop/event-loop.png)
