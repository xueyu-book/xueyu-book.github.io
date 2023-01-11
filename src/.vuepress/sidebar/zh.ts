import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/': [
    '',
    {
      icon: "discover",
      text: '每日一题',
      prefix: 'daily-qa/',
      children: 'structure',
      collapsible: true
    },
    {
      icon: "discover",
      text: 'js基础',
      prefix: 'base-js/',
      children: 'structure',
      collapsible: true
    },
    {
      icon: "discover",
      text: '设计模式',
      prefix: 'design-model/',
      children: 'structure',
      collapsible: true
    },
    {
      icon: "discover",
      text: '计算机网络',
      prefix: 'computer-network/',
      children: 'structure',
      collapsible: true
    },
    {
      icon: "discover",
      text: '高等数学',
      prefix: 'advanced-math/',
      children: 'structure',
      collapsible: true
    }
  ],
});
