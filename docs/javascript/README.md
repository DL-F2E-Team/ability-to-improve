# JavaScript

<TOC />

* 实参 形参
* 函数
* 变量提升
* 执行上下文
* 回收机制
* 作用域链
* VO AO

## class

class super static 继承
```jsx harmony

class myClassParents {
    parentMethods () {
        
    }
}

class myClass extends myClassParents {
    constructor () {
        super()
    }
    unstaticMethods () {
        myClass.staticMethods()
        super.parentMethods()
    }
    static staticMethods () {
        
    }
}
```

## 原型链
![solar](./images/1.jpg)
