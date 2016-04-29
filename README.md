# sTurns

> 原生js轮播图插件，不依赖其他库,适用于移动端或现代浏览器。
> API丰富，简单易用。


[DEMO在这里~~](http://static.schoeu.com/examples/sturns.html)


---

## Setting

### activeClass
- 类型: string
- 默认: sturns_active
- 设置当前焦点页的样式类名

### animate
- 类型: boolean
- 默认: true
- 轮播时，是否使用动画

### autoplay
- 类型: boolean
- 默认: true
- 是否自动轮播

### autoplaySpeed
- 类型: number
- 默认: 3000
- 轮播的间隔时间

### boundary
- 类型: number
- 默认: 显示区域宽度的1/6
- 滑动页面时触发翻动的临界值

### centerMode
- 类型: boolean
- 默认: false
- 是否初始化为居中模式

### centerModeScale
- 类型: number
- 默认: 1
- 初始化为居中模式时候页面居中时候的缩放比

### circle
- 类型: number
- 默认: 1
- 初始化为居中模式时候页面居中时候的缩放比

### during
- 类型: number
- 默认: 400
- 页面轮播时的动画持续时间

### noTouch
- 类型: boolean
- 默认: false
- 为true时，则无法触摸和鼠标滑动轮播页，只能自动轮播

### hoverStop
- 类型: boolean
- 默认: true
- 当鼠标悬停与轮播区域之上，是否停止自动轮播

### isVertical
- 类型: boolean
- 默认: false
- 是否初始化为垂直轮播模式

### pointer
- 类型: boolean
- 默认: true
- 是否自动生成页面指示器

### pointerActiveClass
- 类型: string
- 默认: s_indi_active
- 当前页面指示器的样式类名

### pointerClass
- 类型: string
- 默认: s_turnsPointerClass
- 页面指示器的默认样式类名

### pointerPosition
- 类型: string
- 默认: s_indicator
- 页面指示器的位置样式类名

### preventDefault
- 类型: boolean
- 默认: true
- 是否在滑动时，阻止默认事件

### timingFn
- 类型: string
- 默认: ease-out
- 轮播时，动画应用的动画时间函数，有ease，ease-in，ease-out，ease-in-out，还可以自行指定贝塞尔曲线函数，如：cubic-bezier(n,n,n,n)

## Propertys

### currentIndex
- 类型: number
- 当前页面序号

### mainEleW
- 类型: number
- 轮播区域的宽度

### mainEleH
- 类型: number
- 轮播区域的高度

---

## Events

### onScroll
- 类型: function
- 默认: undefined
- 轮播时的回调函数

### onScrollBeforeStart
- 类型: function
- 默认: undefined
- 轮播前的回调函数

### onScrollEnd
- 类型: function
- 默认: undefined
- 轮播完成后的回调函数

### onScrollBeforeEnd
- 类型: function
- 默认: undefined
- 轮播完成之前的回调函数

### onScrollStart
- 类型: function
- 默认: undefined
- 轮播开始时的回调函数

---

## Method

### prev()
- 轮播到上一页

### next()
- 轮播到下一页

### scrollBy(number)
- 参数: number
- 相对滚动多少像素

### scrollTo(number)
- 参数: number
- 相对于轮播父元素滚动多少像素

### scrollToPage(number)
- 参数: number
- 滚动到第几页

### start()
- 参数: 无
- 开始轮播

### stop()
- 参数: 无
- 停止轮播
