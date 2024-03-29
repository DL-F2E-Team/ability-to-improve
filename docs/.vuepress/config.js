module.exports = {
  title: 'F2E',
  description: 'Not just playing around',
  base: '/ability-to-improve/',
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [2, 3]
    },
  },
  themeConfig: {
    lastUpdated: '最后更新时间',
    nav: [
      {
        text: 'blog',
        link: 'https://lijiahao8898.github.io/'
      }, {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          {
            text: 'lijiahao8898',
            link: 'https://github.com/lijiahao8898'
          },
        ]
      }
    ],
    sidebarDepth: 0,
    sidebar: [{
      title: '目录',
      children: ['/Catalogue.md']
    },
      '/Problem.md',
      '/Test/'
      , {
        title: 'JavaScript',
        children: [
          '/javascript/',
          '/javascript/Event.md',
          '/javascript/Prototype.md',
          '/javascript/Context.md',
          '/javascript/This.md',
          '/javascript/EventLoop.md',
          '/javascript/Array.md',
          '/javascript/Function.md',
          '/javascript/Curry.md',
          '/javascript/Class.md',
          '/javascript/SEO.md',
          '/javascript/mobile.md',
          '/javascript/Question.md',
          '/javascript/Let-Const.md'
        ]
      }, '/html/', {
        title: 'CSS',
        children: [
          '/style/',
          '/style/SASS.md',
          '/style/LESS.md'
        ]
      }, {
        title: 'BOM',
        children: [
          '/http/'
        ]
      }, {
        title: 'Vue',
        children: [
          '/vue/',
          '/vue/VueSSR.md',
          '/vue/VueRouter.md',
          '/vue/Vuex.md',
          '/vue/VuexQuestions.md'
        ]
      }, {
        title: 'React',
        children: [
          '/react/',
          '/react/Context.md',
          '/react/react@16-8-hooks.md',
          '/react/router.md',
          '/react/redux.md',
          '/react/redux-saga.md',
          '/react/dva.md'
        ]
      }, '/blog/', '/tool/', '/Taro/',
      {
        title: 'Typescript',
        children: [
          '/typescript/',
        ]
      },
      {
        title: 'Node',
        children: [
          '/Node/',
        ]
      },
      '/Plugin.md',
      '/Vue.md',
      '/Juejin.md',
      '/Weixin.md',
      '/Github.md'
    ],
  }
};
