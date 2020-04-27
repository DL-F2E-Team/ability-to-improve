module.exports = {
  title: 'F2E',
  description: 'Not just playing around',
  base: '/ability-to-improve/',
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [1, 2]
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
    sidebarDepth: 1,
    sidebar: [{
      title: '目录',
      children: ['/Catalogue.md']
    }, {
      title: 'JavaScript',
      children: [
        '/javascript/',
        '/javascript/This.md',
        '/javascript/Array.md',
        '/javascript/Function.md',
        '/javascript/Prototype.md',
        '/javascript/Event.md',
        '/javascript/EventLoop.md',
        '/javascript/Class.md',
        '/javascript/HOF.md',
        '/javascript/Curry.md',
        '/javascript/SEO.md',
        '/javascript/mobile.md',
        '/javascript/highQuestion.md',
        '/javascript/question.md',
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
        '/react/dva.md'
      ]
    }, '/blog/', '/tool/', '/Taro/'],
  }
};
