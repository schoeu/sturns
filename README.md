# sTurns carousel for mobile or modern browser.

- 原生js轮播图插件，不依赖其他库
- 适用于移动端或现代浏览器。
- API丰富，简单易用。
具体参照：
<!DOCTYPE html>
<html manifest="sturns.appcache">
<head lang="en">
    <meta charset="UTF-8">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 选项 black black-translucent default-->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="viewport" content="width=device-width,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,initial-scale=1.0">
    <style type="text/css" rel="stylesheet">
        .s_turns{
            width: 100%;
            overflow: hidden;
            position: relative;
        }
        .s_turnsLists>div{
            float: left;
        }
        .s_turnsLists,.s_turnsListsV{
            overflow: hidden;
            width: 100%;
        }
        .s_turnsListsV>div{
            display: block;
        }
        .transition2s{
            -webkit-transition:  all .3s ease-out;
            -moz-transition:  all .3s ease-out;
            transition: all .3s ease-out;
        }


        .s_indicator {
            height: 20px!important;
            margin: 0 auto;
            position: absolute;
            width: 100%;
            bottom: 0px;
        }

        .s_turnsPointerClass{
            width: 10px!important;
            height: 10px!important;
            border-radius: 5px!important;
            background-color: rgba(0,0,0,0.3)!important;
            z-index: 999!important;
        }

        .s_indicator>div>div {
            float: left;
            margin-left: 5px;
        }

        .s_indicator>div {
            margin: 0 auto;
            background-color: transparent!important;
            max-width: 90%;
            background-image: transparent!important;
        }
        .s_indi_active{
            background-color: rgba(0,0,0,0.7)!important;
        }

        /***demo css***/
        body{background-color: #ffffff;margin:0;padding:0;font-size:16px;box-sizing:border-box;color: rgb(50,50,50);}a,li,p,div,ul,nav,span,img,header{-webkit-user-select:none;user-select:none;-webkit-text-size-adjust:none;text-size-adjust:none;outline:0;/* padding: 10px; */}li{list-style:none;border:0}

        .singleDemo,.singleDemoCenter,.singleDemoV,.singleDemoVCenter{
            height: 150px;
        }

        div,p,body{
            -webkit-tap-highlight-color:rgba(0,0,0,0);
            font-family: Helvetica,STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Arial;
        }
        body{
            padding: 20px;
            background-color: rgb(140, 209, 255);
            max-width: 640px;
            margin: 0 auto;
        }

        .singleDemo>div,.singleDemoCenter>div,.singleDemoV>div,.singleDemoVCenter>div{
            height: 150px;
            text-align: center;
        }
        .s_turnsLists>div,.s_turnsListsV>div{
            background-image: -webkit-linear-gradient(45deg, #CAE1FF, #A1BBFF);
            background-image: -moz-linear-gradient(45deg, #CAE1FF, #A1BBFF);
            background-image: -ms-linear-gradient(45deg, #CAE1FF, #A1BBFF);
            background-image: -o-linear-gradient(45deg, #CAE1FF, #A1BBFF);
            background-image: linear-gradient(45deg, #CAE1FF, #A1BBFF);
        }
        .picDemo img{
            width: 100%;
            height: 150px;
            border-left: 1px solid #FFF;
        }

        .picDemo{
            height: 150px;
        }
        .demo{
            margin-bottom: 50px;
            max-width: 640px;
            margin: 50px auto;
        }
        .singleDemo>div>div:nth-child(2){
            background-color: #aaaaff;
        }
        .singleDemo>div>div:nth-child(3){
            background-color: #e1ba53;
        }
        .sturns_active{
            color:#FFF!important;
            transition: all .4s;
        }
        .singleDemo p,.singleDemoCenter p,.singleDemoV p,.singleDemoVCenter p{
            line-height: 150px;
            font-size: 38px;
            margin: 0;
        }

        #prev,#next{
            line-height: 30px;
            border: 1px solid #ace;
            width: 40px;
        }
        #btns{
            margin: 20px auto;
            text-align: center;
        }

        .pp{
            width: 15px;
            height: 15px;
            background-color: yellowgreen;
        }

        .pac{
            background-color: yellow;
        }
        .activeC{
            background-color: #e1ba53!important;
        }
        .pos{
            top: 20px;
        }

        pre{
            background-color: rgb(64,64,64);
            color: #FFF;
            padding: 10px;
            overflow: scroll;
            font-size: 14px;
            text-indent:-2em;
            font-family: Helvetica,STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Arial;
        }
        .spec{
            color: rgb(202,158,77);
        }
        .string{
            color: rgb(52,174,52);
        }
        .temp{
            color: rgb(155,194,142);
        }
        .num{
            color: rgb(250,113,187);
        }
        h1{
            text-align: center;
            color: #FFF;
            line-height: 50px;
        }

        .settings,.events,.propertys {
            color: #FFF;
        }

        .pros {
            padding: 10px;
            border-bottom: 1px solid #FFF;
        }
        footer{
            text-align: center;
            font-size: 13px;
            padding: 100px 0;
            color: #FFF;
        }

        .picDemoS img{
            height: 150px;
            width: 100%;
        }
        .turntogit{
            color: #fff;
            margin: 0;
            border-bottom: 1px solid #FFF;
        }

        .clear:after{
            content: '.';
            display: block;
            height: 0;
            visibility: hidden;
            clear: both;
        }

        .turntogit a{
            display: block;
            line-height: 35px;
            text-decoration: none;
            color: #fff;
            width: 150px;
            text-align: center;
            border-radius: 3px;
            float: right;
        }
    </style>

    <title>Sturns test page</title>
</head>
<body>
    <h1>Sturns demo</h1>
    <p class="turntogit clear"><a href="https://github.com/schoeu/sturns" target="_blank">View On Github</a></p>
     <div class="singleDemo demo">
        <div>
            <div><p>1</p></div>
            <div><p>2</p></div>
            <div><p>3</p></div>
            <div><p>4</p></div>
        </div>
    </div>
    <pre>
        <span class="spec">var </span><span class="temp">singleDemoCenter</span> =<span class="spec"> new</span> Sturns(<span class="string">".singleDemo"</span>);
    </pre>

    <div class="singleDemoCenter demo">
        <div>
            <div><p>1</p></div>
            <div><p>2</p></div>
            <div><p>3</p></div>
            <div><p>4</p></div>
        </div>
    </div>
    <pre>
        <span class="spec">var </span><span class="temp">singleDemoCenter</span> =<span class="spec"> new</span> Sturns(<span class="string">".singleDemoCenter"</span>,{
            autoplay: <span class="spec">false</span>,
            centerMode : <span class="spec">true</span>,
            circle:<span class="spec">false</span>,
        });
    </pre>

    <div class="singleDemoV demo">
        <div>
            <div><p>1</p></div>
            <div><p>2</p></div>
            <div><p>3</p></div>
            <div><p>4</p></div>
        </div>
    </div>
     <pre>
         <span class="spec">var </span><span class="temp">singleDemoV</span> =<span class="spec"> new</span> Sturns(<span class="string">".singleDemoV"</span>,{
            autoplay: <span class="spec">false</span>,
            circle : <span class="spec">false</span>,
            isVertical:<span class="spec">true</span>,
            pointer:<span class="spec">false</span>,
            onScroll:<span class="spec">function</span>(idx,obj){
                console.log(<span class="string">"第"</span>+idx+<span class="string">"页， moveX: "</span>+obj.moveX+<span class="string">" moveY: "</span>+obj.moveY);
            }
        });
    </pre>



    <div class="singleDemoVCenter demo">
         <div>
             <div><p>1</p></div>
             <div><p>2</p></div>
             <div><p>3</p></div>
             <div><p>4</p></div>
         </div>
     </div>
     <pre>
        <span class="spec">var </span><span class="temp">singleDemoVCenter</span> =<span class="spec"> new</span> Sturns(<span class="string">".singleDemoVCenter"</span>,{
            autoplay: <span class="spec">false</span>,
            centerMode : <span class="spec">true</span>,
            isVertical:<span class="spec">true</span>,
        });
    </pre>

     <div class="picDemo demo">
         <div>
             <div>
                 <img src="image/77.jpg"/>
             </div>
             <div>
                 <img src="image/88.jpg">
             </div>
             <div>
                 <img src="image/99.jpg"/>
             </div>
         </div>
     </div>
     <pre>
         <span class="spec">var </span><span class="temp">picDemo</span> =<span class="spec"> new</span> Sturns(<span class="string">".picDemo"</span>,{
            isVertical : <span class="spec">false</span>,
            centerMode : <span class="spec">true</span>,
            autoplay: <span class="spec">false</span>
        });
    </pre>
    <div class="picDemoS demo">
        <div>
            <div>
                <img src="image/77.jpg"/>
            </div>
            <div>
                <img src="image/2.png"/>
            </div>
            <div>
                <img src="image/99.jpg"/>
            </div>
        </div>
    </div>
     <pre>
         <span class="spec">var </span><span class="temp">picDemoS</span> =<span class="spec"> new</span> Sturns(<span class="string">".picDemoS"</span>,{
            centerMode: <span class="spec">true</span>,
            isVertical : <span class="spec">false</span>,
            centerModeScale:<span class="num">0.8</span>,
            noTouch: <span class="spec">true</span>
        });
    </pre>

    <h1>Settings</h1>

    <div class="settings">
        <div class="pros">
            <p>activeClass</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> sturns_active</p>
            <p>设置当前焦点页的样式类名</p>
        </div>
        <div class="pros">
            <p>animate</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>轮播时，是否使用动画</p>
        </div>
        <div class="pros">
            <p>autoplay</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>是否自动轮播</p>
        </div>
        <div class="pros">
            <p>autoplaySpeed</p>
            <p><strong>类型:</strong> number</p>
            <p><strong>默认:</strong> 3000</p>
            <p>轮播的间隔时间</p>
        </div>
        <div class="pros">
            <p>boundary</p>
            <p><strong>类型:</strong> number</p>
            <p><strong>默认:</strong> 显示区域宽度的1/6</p>
            <p>滑动页面时触发翻动的临界值</p>
        </div>
        <div class="pros">
            <p>centerMode</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> false</p>
            <p>是否初始化为居中模式</p>
        </div>
        <div class="pros">
            <p>centerModeScale</p>
            <p><strong>类型:</strong> number</p>
            <p><strong>默认:</strong> 1</p>
            <p>初始化为居中模式时候页面居中时候的缩放比</p>
        </div>
        <div class="pros">
            <p>circle</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>是否初始化为循环模式</p>
        </div>
        <div class="pros">
            <p>during</p>
            <p><strong>类型:</strong> number</p>
            <p><strong>默认:</strong> 400</p>
            <p>页面轮播时的动画持续时间</p>
        </div>
        <div class="pros">
            <p>centerMode</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> false</p>
            <p>是否初始化为居中模式</p>
        </div>
        <div class="pros">
            <p>direction</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> ltr</p>
            <p>自动轮播时，ltr:从左向右（从上向下），rtl:从右向左（从下向上）</p>
        </div>
        <div class="pros">
            <p>noTouch</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> false</p>
            <p>为true时，则无法触摸和鼠标滑动轮播页，只能自动轮播</p>
        </div>
        <div class="pros">
            <p>hoverStop</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>当鼠标悬停与轮播区域之上，是否停止自动轮播</p>
        </div>
        <div class="pros">
            <p>isVertical</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> false</p>
            <p>是否初始化为垂直轮播模式</p>
        </div>
        <div class="pros">
            <p>pointer</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>是否自动生成页面指示器</p>
        </div>
        <div class="pros">
            <p>pointerActiveClass</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> s_indi_active</p>
            <p>当前页面指示器的样式类名</p>
        </div>
        <div class="pros">
            <p>pointerClass</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> s_turnsPointerClass</p>
            <p>页面指示器的默认样式类名</p>
        </div>
        <div class="pros">
            <p>pointerPosition</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> s_indicator</p>
            <p>页面指示器的位置样式类名</p>
        </div>
        <div class="pros">
            <p>preventDefault</p>
            <p><strong>类型:</strong> boolean</p>
            <p><strong>默认:</strong> true</p>
            <p>是否在滑动时，阻止默认事件</p>
        </div>
        <div class="pros">
            <p>timingFn</p>
            <p><strong>类型:</strong> string</p>
            <p><strong>默认:</strong> ease-out</p>
            <p>轮播时，动画应用的动画时间函数，有ease，ease-in，ease-out，ease-in-out，还可以自行指定贝塞尔曲线函数，如：cubic-bezier(n,n,n,n)</p>
        </div>

    </div>

    <h1>Propertys</h1>
    <div class="propertys">
        <div class="pros">
            <p>currentIndex</p>
            <p><strong>类型:</strong> number</p>
            <p>当前页面序号</p>
        </div>
        <div class="pros">
            <p>mainEleW</p>
            <p><strong>类型:</strong> number</p>
            <p>轮播区域的宽度</p>
        </div>
        <div class="pros">
            <p>mainEleW</p>
            <p><strong>类型:</strong> number</p>
            <p>轮播区域的高度</p>
        </div>
    </div>



    <h1>Events</h1>
    <div class="events">
        <div class="pros">
            <p>onScroll</p>
            <p><strong>类型:</strong> function</p>
            <p><strong>默认:</strong> undefined</p>
            <p>轮播时的回调函数</p>
        </div>
        <div class="pros">
            <p>onScrollBeforeStart</p>
            <p><strong>类型:</strong> function</p>
            <p><strong>默认:</strong> undefined</p>
            <p>轮播前的回调函数</p>
        </div>
        <div class="pros">
            <p>onScrollEnd</p>
            <p><strong>类型:</strong> function</p>
            <p><strong>默认:</strong> undefined</p>
            <p>轮播完成后的回调函数</p>
        </div>
        <div class="pros">
            <p>onScrollBeforeEnd</p>
            <p><strong>类型:</strong> function</p>
            <p><strong>默认:</strong> undefined</p>
            <p>轮播完成之前的回调函数</p>
        </div>
        <div class="pros">
            <p>onScrollStart</p>
            <p><strong>类型:</strong> function</p>
            <p><strong>默认:</strong> undefined</p>
            <p>轮播开始时的回调函数</p>
        </div>
    </div>

    <h1>Function</h1>
    <div class="events">
        <div class="pros">
            <p>prev</p>
            <p>轮播到上一页</p>
        </div>
        <div class="pros">
            <p>next</p>
            <p>轮播到下一页</p>
        </div>
        <div class="pros">
            <p>scrollBy</p>
            <p><strong>参数:</strong> number</p>
            <p>相对滚动多少像素</p>
        </div>
        <div class="pros">
            <p>scrollTo</p>
            <p><strong>参数:</strong> number</p>
            <p>相对于轮播父元素滚动多少像素</p>
        </div>
        <div class="pros">
            <p>scrollToPage</p>
            <p><strong>参数:</strong> number</p>
            <p>滚动到第几页</p>
        </div>
        <div class="pros">
            <p>start</p>
            <p><strong>参数:</strong> 无</p>
            <p>开始轮播</p>
        </div>
        <div class="pros">
            <p>stop</p>
            <p><strong>参数:</strong> 无</p>
            <p>停止轮播</p>
        </div>
    </div>

   <footer>schoeu.com</footer>

<!--<script type="text/javascript" src="../src/demo.js"></script>-->
<script type="text/javascript" src="js/common/sturns.js"></script>
<script type="text/javascript">

/**
 * Created by schoeu on 2015/3/3.
 */

var singleDemo = new Sturns(".singleDemo");

var singleDemoCenter = new Sturns(".singleDemoCenter",{
    autoplay: false,
    centerMode : true,
    circle:false
});

var singleDemoV = new Sturns(".singleDemoV",{
    autoplay: false,
    circle:false,
    isVertical:true,
    pointer:false,
    onScroll:function(idx,e){
        //console.log(e);
    }
});

var singleDemoVCenter = new Sturns(".singleDemoVCenter",{
    autoplay: false,
    centerMode : true,
    isVertical:true
});

var picDemo = new Sturns(".picDemo",{
    isVertical:false,
    centerMode : true,
    autoplay:false

});

var picDemoS = new Sturns(".picDemoS",{
    noTouch:true
});
</script>

</body>
</html>

====
