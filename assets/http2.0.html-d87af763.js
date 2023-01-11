import{_ as e,V as a,W as i,a0 as t}from"./framework-afccc25a.js";const h={},l=t('<h1 id="http2-0有哪些进步" tabindex="-1"><a class="header-anchor" href="#http2-0有哪些进步" aria-hidden="true">#</a> Http2.0有哪些进步</h1><h2 id="多路复用" tabindex="-1"><a class="header-anchor" href="#多路复用" aria-hidden="true">#</a> 多路复用</h2><ul><li>多路复用，就是在一个 TCP 连接中可以存在多条流（最多6条）。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。</li><li>HTTP/2的多路复用允许同时通过单一的HTTP/2连接发起多重的请求/响应消息。</li></ul><h2 id="二进制传输" tabindex="-1"><a class="header-anchor" href="#二进制传输" aria-hidden="true">#</a> 二进制传输</h2><ul><li>之前的HTTP的版本中，我们传输数据方式--文本传输。</li><li>在HTTP 2.0中引入了新的编码机制，将所有传输的信息分割成为更小的消息和帧，并采用二级制格式编码。</li><li>HTTP2.0 通信都在一个连接上完成，这个连接可以承载任意数量的双向数据流。更有效地使用tcp连接，让高带宽也能真正的服务于HTTP性能提升。</li></ul><h2 id="首部压缩-压缩http头部" tabindex="-1"><a class="header-anchor" href="#首部压缩-压缩http头部" aria-hidden="true">#</a> 首部压缩 - 压缩HTTP头部</h2><ul><li>HTTP1.1并不支持首部压缩，SPDY采用的是通用的算法deflate</li><li>HTTP2.0采用的是专门为首部压缩设计的HPACK，HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。</li></ul><h2 id="服务端推送" tabindex="-1"><a class="header-anchor" href="#服务端推送" aria-hidden="true">#</a> 服务端推送</h2><ul><li>服务端推送是一种在客户端请求之前发送数据的机制。</li><li>在 HTTP 2.0 中，服务端可以在客户端某个请求后，主动推送其他资源。</li><li>局限性：无法解决加载资源的先后顺序，因此会出现必要资源晚于非必要资源加载，导致页面无法正常展示。</li></ul>',9),r=[l];function d(n,c){return a(),i("div",null,r)}const T=e(h,[["render",d],["__file","http2.0.html.vue"]]);export{T as default};