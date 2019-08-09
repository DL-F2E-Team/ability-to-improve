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
        nav: [
            {text: 'blog', link: 'https://lijiahao8898.github.io/'},
            {
                text: 'github',
                // 这里是下拉列表展现形式。
                items: [
                    {text: 'lijiahao8898', link: 'https://github.com/lijiahao8898'},
                ]
            }
        ],
        sidebar: ['/', {
            title: 'Javascript',
            children: [
                '/javascript/',
                '/javascript/question.md'
            ]
        }, '/html/', '/style/', {
            title: 'React',
            children: [
                '/react/',
                '/react/router.md',
                '/react/dva.md'
            ]
        }, '/vue/', {
            title: '游览器宿主',
            children: [
                '/http/',
                '/http/BOM.md'
            ]
        }, '/blog/'],
        sidebarDepth: 0,
    }
}
