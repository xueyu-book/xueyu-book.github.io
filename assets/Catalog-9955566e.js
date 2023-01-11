import{O as G,u as N}from"./app-c08deba6.js";import{c as v,h as $,j as n,D as S,B as C,R as f}from"./framework-afccc25a.js";var m=v({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(l){const p=$(()=>{const c={};return l.color&&(c.color=l.color),l.size&&(c["font-size"]=Number.isNaN(Number(l.size))?l.size:`${l.size}px`),Object.keys(c).length?c:null});return()=>l.icon?n("span",{class:["font-icon icon",`iconfont icon-${l.icon}`],style:p.value}):null}}),O=v({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},titleGetter:{type:Function,default:l=>l.title},iconGetter:{type:Function,default:l=>l.icon},orderGetter:{type:Function,default:l=>l.order||0},shouldIndex:{type:Function,default:l=>l.index!==!1}},setup(l){const p=G({"/docs/":{title:"目录"},"/":{title:"Catalog"}}),c=S(),b=C(),y=N(),k=()=>{const o=l.base||c.path.replace(/\/[^/]+$/,"/"),u=b.getRoutes(),d=[];return u.filter(({meta:t,path:e})=>{if(!e.startsWith(o)||e===o)return!1;if(o==="/"){const a=Object.keys(y.value.locales).filter(i=>i!=="/");if(e==="/404.html"||a.some(i=>e.startsWith(i)))return!1}return(e.endsWith(".html")&&!e.endsWith("/index.html")||e.endsWith("/"))&&l.shouldIndex(t)}).map(({path:t,meta:e})=>{const a=t.substring(o.length).split("/").length;return{title:l.titleGetter(e),icon:l.iconGetter(e),base:t.replace(/\/[^/]+\/?$/,"/"),order:l.orderGetter(e),level:t.endsWith("/")?a-1:a,path:t}}).filter(({title:t,level:e})=>e<=l.level||!t).sort((t,e)=>t.level-e.level||(t.path.endsWith("/index.html")?-1:e.path.endsWith("/index.html")?1:t.order===null?e.order===null?t.title.localeCompare(e.title):e.order:e.order===null?t.order:t.order>0?e.order>0?t.order-e.order:-1:e.order<0?t.order-e.order:1)).forEach(t=>{var e;const{base:a,level:i}=t;switch(i){case 1:d.push(t);break;case 2:{const s=d.find(r=>r.path===a);s&&(s.children??(s.children=[])).push(t);break}default:{const s=d.find(r=>r.path===a.replace(/\/[^/]+\/$/,"/"));if(s){const r=(e=s.children)==null?void 0:e.find(h=>h.path===a);r&&(r.children??(r.children=[])).push(t)}}}}),d},x=$(()=>k());return()=>n("div",{class:"catalog-wrapper"},[n("h2",{class:"main-title"},p.value.title),...x.value.map(({children:o=[],icon:u,path:d,title:t},e)=>[n("h3",{id:t,class:["child-title",{"has-children":o.length}]},[n("a",{href:`#${t}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:d},()=>[u?n(m,{icon:u}):null,`${e+1}. ${t||"Unknown"}`])]),o.length?n("ul",{class:"child-catalog-wrapper"},o.map(({children:a=[],icon:i,path:s,title:r},h)=>n("li",{class:"child-catalog-item"},[n("div",{class:["sub-title",{"has-children":a.length}]},[n("a",{href:`#${r}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:s},()=>[i?n(m,{icon:i}):null,`${e+1}.${h+1} ${r||"Unknown"}`])]),a.length?n("div",{class:"sub-catalog-wrapper"},a.map(({icon:g,path:W,title:w},z)=>n(f,{class:"sub-catalog-item",to:W},()=>[g?n(m,{icon:g}):null,`${e+1}.${h+1}.${z+1} ${w||"Unknown"}`]))):null]))):null])])}});export{O as default};
