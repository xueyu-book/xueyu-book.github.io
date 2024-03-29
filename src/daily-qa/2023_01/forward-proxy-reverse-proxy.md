---
title: 正向代理和反向代理
order: 2
date: 2023-01-11
---

# 正向代理和反向代理


## 特点

### 正向代理
- 代理客户端，隐藏真实的客户，为客户端收发请求，使真实客户端对服务器不可见。
- 一个局域网内的所有用户可能被一台服务器做了正向代理，由该台服务器负责 HTTP 请求;
意味着同服务器做通信的是正向代理服务器。

### 反向代理
- 代理服务器，隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。
- 负载均衡服务器，将用户的请求分发到空闲的服务器上;意味着用户和负载均衡服务器直接通信，即用户解析服务器域名时得到的是负载均衡服务器的 IP 。

## 共同点

- 都是作为服务器和客户端的中间层。
- 都可以加强内网的安全性，阻止 web 攻击。
- 都可以做缓存机制，提高访问速度。

## 区别

- 正向代理其实是客户端的代理,反向代理则是服务器的代理。
- 正向代理中，服务器并不知道真正的客户端到底是谁；而在反向代理中，客户端也不知道真正的服务器是谁。
- 作用不同。正向代理主要是用来解决访问限制问题；而反向代理则是提供负载均衡、安全防护等作用。
