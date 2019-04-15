module.exports = {
    title: 'Improve yourself',
    description: 'Not just playing around',
    base: '/ability-to-improve/',
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [1, 2]
        },
    },
    themeConfig: {
        // nav: [{
        //     text: 'javascript',
        //     link: '/'
        // }],
        sidebar: ['/',{
            title: 'Javascript',
            children: [
                '/javascript/',
            ]
        }, '/html/', '/style/', {
            title: 'React',
            children: [
                '/react/'
            ]
        }, '/http/', '/vue/'],
        sidebarDepth: 2,
    }
    // themeConfig: {
    //     // 添加导航栏
    //     nav: [
    //         { text: 'vue', link: '/' },
    //         { text: 'css', link: '/blog/' },
    //         { text: 'js', link: '/zhihu/' },
    //         {
    //             text: 'github',
    //             // 这里是下拉列表展现形式。
    //             items: [
    //                 { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
    //                 { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
    //             ]
    //         }
    //     ],
}