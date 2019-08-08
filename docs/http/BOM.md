# BOM

## todo list
* getComputedStyle
* window.getComputedStyle == document.defaultView.getComputedStyle
* window.getComputedStyle(elem, null).getPropertyValue("height")
window.getComputedStyle(elem, null).getPropertyValue("height")可能的值为100px，而且，就算是css上写的是inherit，getComputedStyle也会把它最终计算出来的。不过注意，如果元素的背景色透明，那么getComputedStyle获取出来的就是透明的这个背景（因为透明本身也是有效的），而不会是父节点的背景。所以它不一定是最终显示的颜色。
* getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息进行计算（譬如宽高等），所以用的时候慎用，回流会引起性能问题。
* 其他回流：offsetXXX，scrollXXX，clientXXX，currentStyle
