---
title: CDN工作原理
order: 3
date: 2023-01-11
---

# CDN工作原理

## 原理简介


当用户访问使用CDN服务的网站时，本地DNS服务器通过`CNAME`方式将最终域名请求重定向到CDN服务。CDN通过一组预先定义好的策略(如内容类型、地理区域、网络负载状况等)，将当时能够最快响应用户的CDN节点IP地址提供给用户，使用户可以以最快的速度获得网站内容。它能够有效解决网络带宽小、用户访问量大、网点分布不均等问题。

## 工作流程


- 当终端用户向`www.xueyu.studio`下的指定资源发起请求时，首先向LDNS（本地DNS）发起域名解析请求。
- LDNS检查缓存中是否有`www.xueyu.studio`的IP地址记录。如果有，则直接返回给终端用户；如果没有，则向授权DNS查询。
- 当授权DNS解析`www.xueyu.studio`时，返回域名CNAME `www.xueyustudio.cdn.com`对应IP地址。
- 域名解析请求发送至DNS调度系统，并为请求分配最佳节点IP地址（距离终端用户最近且可用）。
- LDNS获取DNS返回的解析IP地址。
- 用户获取解析IP地址。
- 用户向获取的IP地址发起对该资源的访问请求。
- 如果该IP地址对应的节点已缓存该资源，则会将数据直接返回给用户，请求结束。
- 如果该IP地址对应的节点未缓存该资源，则节点向源站发起对该资源的请求。获取资源后，结合用户自定义配置的缓存策略，将资源缓存至节点，并返回给用户，请求结束。

## 优点


- 加速网站的访问
- 实现跨运营商、跨地域的全网覆盖
- 保障你的网站安全（例如分布式阻断服务攻击等）
- 异地备援（最大限度避免服务器宕机）
- 为了节约成本（减轻购买服务器与后续的托管运维）
- 开发者更加专注业务本身

## 缺点


- 存在数据同步延时，主服务器端和各地缓存器可能会存在不同步的情况。
