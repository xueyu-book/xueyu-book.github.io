const sideBarConfig = require("./baseConfig/sidebarConfig") 
const navConfig = require('./baseConfig/navConfig')

module.exports = {
  title: "鳕鱼笔记本",
  description: '记录日常学习',
  head: [
    ['link', {rel: 'shortcut icon', href: '/favicon.ico'}]
  ],
  themeConfig: {
    // logo: "/assets/img/bg.jpg",
    // 导航栏链接
    nav: navConfig,
    sidebar: 'auto',
    sidebar: sideBarConfig,
    // lastUpdated: "Last Updated",
    smoothScroll: true, // string | boolean
  },
  dest: 'dist',
  plugins: [
    // "vuepress-plugin-cat"
  ]
};
