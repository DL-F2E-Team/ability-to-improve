## Class

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