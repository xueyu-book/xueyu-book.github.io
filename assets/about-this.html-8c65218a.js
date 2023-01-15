import{_ as n,V as s,W as a,a0 as t}from"./framework-afccc25a.js";const e="/assets/docs/base-js/about-this.png",o={},p=t(`<h1 id="关于this" tabindex="-1"><a class="header-anchor" href="#关于this" aria-hidden="true">#</a> 关于this</h1><p><code>this</code> 是很多人会混淆的概念，但是其实它一点都不难，只是网上很多文章把简单的东西说复杂了。在这一小节中，你一定会彻底明白 <code>this</code> 这个概念的。</p><h2 id="普通函数调用场景" tabindex="-1"><a class="header-anchor" href="#普通函数调用场景" aria-hidden="true">#</a> 普通函数调用场景</h2><h3 id="我们先来看几个函数调用的场景" tabindex="-1"><a class="header-anchor" href="#我们先来看几个函数调用的场景" aria-hidden="true">#</a> 我们先来看几个函数调用的场景</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接下来我们一个个分析上面几个场景" tabindex="-1"><a class="header-anchor" href="#接下来我们一个个分析上面几个场景" aria-hidden="true">#</a> 接下来我们一个个分析上面几个场景</h3><p>对于直接调用 <code>foo</code> 来说，不管 <code>foo</code> 函数被放在了什么地方，<code>this</code> 一定是 <code>window</code> 对于 <code>obj.foo()</code> 来说，我们只需要记住，<strong>谁调用了函数，谁就是</strong> <code>this</code>，所以在这个场景下 <code>foo</code> 函数中的 <code>this</code> 就是 <code>obj</code> 对象 对于 <code>new</code> 的方式来说，<code>this</code> 被永远绑定在了 <code>c</code> 上面，不会被任何方式改变 <code>this</code>。</p><h2 id="箭头函数调用场景" tabindex="-1"><a class="header-anchor" href="#箭头函数调用场景" aria-hidden="true">#</a> 箭头函数调用场景</h2><p>说完了以上几种情况，其实很多代码中的 <code>this</code> 应该就没什么问题了，下面让我们看看箭头函数中的 <code>this</code></p><h3 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h3><p>首先箭头函数其实是没有 <code>this</code> 的，箭头函数中的 <code>this</code> <strong>只取决包裹箭头函数的第一个普通函数</strong>的 <code>this</code>。在这个例子中，因为包裹箭头函数的第一个普通函数是 <code>a</code>，所以此时的 <code>this</code> 是 <code>window</code>。</p><p>另外对箭头函数使用 <code>bind</code> 这类函数是无效的。</p><h2 id="改变上下文的api的调用场景" tabindex="-1"><a class="header-anchor" href="#改变上下文的api的调用场景" aria-hidden="true">#</a> 改变上下文的API的调用场景</h2><p>最后种情况也就是 <code>bind</code> 这些改变上下文的 <code>API</code> 了，对于这些函数来说，<code>this</code> <strong>取决于第一个参数</strong>，如果第一个参数为空，那么就是 <code>window</code>。</p><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span>    <span class="token comment">// 在浏览器中，this 指向全局的 &quot;window&quot; 对象</span>
<span class="token keyword">var</span> module <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">81</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getX</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 81</span>

<span class="token keyword">var</span> retrieveX <span class="token operator">=</span> module<span class="token punctuation">.</span>getX<span class="token punctuation">;</span>
<span class="token function">retrieveX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
<span class="token comment">// 返回 9 - 因为函数是在全局作用域中调用的</span>

<span class="token comment">// 创建一个新函数，把 &#39;this&#39; 绑定到 module 对象</span>
<span class="token comment">// 新手可能会将全局变量 x 与 module 的属性 x 混淆</span>
<span class="token keyword">var</span> boundGetX <span class="token operator">=</span> <span class="token function">retrieveX</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">boundGetX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 81</span>

<span class="token keyword">var</span> boundGetX1 <span class="token operator">=</span> <span class="token function">retrieveX</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">boundGetX1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h3><p>那么说到 <code>bind</code>，不知道大家是否考虑过，如果对一个函数进行多次 <code>bind</code>，那么上下文会是什么呢？</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// =&gt; ?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// fn.bind().bind(a) 等于</span>
<span class="token keyword">let</span> <span class="token function-variable function">fn2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以从上述代码中发现，不管我们给函数 <code>bind</code> 几次，fn 中的 <code>this</code> 永远由第一次 <code>bind</code> 决定，所以结果永远是 <code>window</code>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;aaa&#39;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// =&gt; &#39;yck&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>以上就是 <code>this</code> 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 <code>this</code> 最终指向哪里。</p><p>首先，<code>new</code> 的方式优先级最高，接下来是 <code>bind</code> 这些函数，然后是 <code>obj.foo()</code> 这种调用方式，最后是 <code>foo</code> 这种调用方式，同时，箭头函数的 <code>this</code> 一旦被绑定，就不会再被任何方式所改变。</p><p>如果你还是觉得有点绕，那么就看以下的这张流程图吧，图中的流程只针对于单个规则。</p><figure><img src="`+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',30),c=[p];function i(l,u){return s(),a("div",null,c)}const r=n(o,[["render",i],["__file","about-this.html.vue"]]);export{r as default};