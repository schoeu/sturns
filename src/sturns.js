/*
     Version: 1.0.1
     Author: Schoeu
     update: 2015/3/3
     suports:IE10+ Firefox Chrome Opera Safari Android IOS
     Website: http://schoeu.com
     Docs: http://schoeu.github.io/sturns
     Repo: http://github.com/schoeu/sturns
     Issues: http://github.com/schoeu/sturns/issues
 */

void function (window,s,undefined){
    'use strict';

    //兼容AMD模式
    if (typeof define === 'function' && define.amd) {
        define(function(){
            return s(window,undefined);
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = s(window,undefined);
    } else {
        //绑定全局变量window
        window.Sturns || (window.Sturns = s(window,undefined));
    }

}(window,function(window,undefined){
    'use strict';

    var Sturns = function(selector,options){
        var centerModeScale;

        options = options || {};

        this.mainEle = document.querySelector(selector);

        //如果主元素传参有误，则直接返回。
        if(!this.mainEle){
            return;
        }

        //滚动区域的宽度
        this.mainEleW = this.mainEle.offsetWidth;

        //滚动区域的高度
        this.mainEleH = this.mainEle.offsetHeight;

        //滚动页的父元素
        this.scrollEle = this.mainEle.children[0];

        //滚动页的所有元素
        this.pages = this.scrollEle.children;

        //当前页序号
        this.currentIndex = 0;

        //滚动页宽度
        this.pageWidth = this.pages[0].offsetWidth;

        //滚动页高度
        this.pageHeight = this.pages[0].offsetHeight;

        //是否已经滚动到边界
        this.isBoundary = true;

        //滚动也的个数，不包含克隆的元素节点
        this.length = this.scrollEle.children.length;
        this.prevPageIdx = 1;
        if(typeof options === "object"){
            //水平滚动的方向
            // ltr：左到右   rtl：右到左  默认为从左到右
            this.direction = options.direction || "ltr";
            //滚动时的回调函数
            this.onScroll = options.onScroll || undefined;

            //当前页滚动完成之前的回调函数
            this.onScrollBeforeEnd = options.onScrollBeforeEnd || undefined;

            //当前页滚动完成的回调函数
            this.onScrollEnd = options.onScrollEnd || undefined;
            //当前页滚动开始时的回调函数
            this.onScrollStart = options.onScrollStart || undefined;
            //当前页滚动开始之前的回调函数
            this.onScrollBeforeStart = options.onScrollBeforeStart || undefined;
            //是否自动轮播 Boolean值
            this.autoplay = options.autoplay === false ? false : true;

            //水平滚动 or 垂直滚动
            this.isVertical = options.isVertical === true ? true : false;

            //当前页滚动多少像素则判定滑到下一页，
            // int值，默认为当前页宽度的六分之一。
            this.boundary = parseInt(options.boundary) || (this.isVertical ? this.mainEleH : this.mainEleW)/6;
            this.prevBoundary = this.boundary;   //用于换页时判断是否循环

            //鼠标悬停在插件区域则停止自动轮播， Boolean值
            this.hoverStop = options.hoverStop === false ? false : true;

            //是否启用居中模式，默认为不启用。
            // 启用后当前页的左右两边可以看到前一个和后一个滚动页的一边。
            this.centerMode = options.centerMode === true ? true : false;

            //滚动时使用启用动画，默认为启用
            this.animate = options.animate === false ? false : true;

            //是否启用滚动页指示器，默认为true
            this.pointer = options.pointer === false ? false : true;

            //默认的滚动页指示器小圆点的样式， 传入CSS样式类名字符串。
            this.pointerClass = options.pointerClass || "s_turnsPointerClass";

            //当前的滚动页的样式， 传入CSS样式类名字符串。
            this.activeClass = options.activeClass || "sturns_active";

            //当前的滚动页指示器小圆点的样式， 传入CSS样式类名字符串。
            this.pointerActiveClass = options.pointerActiveClass || "s_indi_active";

            //滚动页指示器的整体位置，传入CSS样式类名字符串
            this.pointerPosition = options.pointerPosition || "s_indicator";

            //是否启用循环模式，默认为启用
            this.circle = options.circle === false ? false : true;

            //启用居中模式后，当前页与非居中模式页面的宽度比
            //范围为0~1之间的小数，默认为 0.85
            centerModeScale = options.centerModeScale || 0.85;
            this.centerModeScale = centerModeScale > 1 ? 1 : centerModeScale;

            //动画缓动曲线
            this.timingFn = options.timingFn || "ease";

            //动画持续时长
            this.during = (options.during || 500);
            this.duringSec = this.during/1000;

            //自动轮播的时间间隔，以毫秒为单位
            this.autoplaySpeed = (options.autoplaySpeed || 3000) + this.during;

            //滑动时是否阻止默认事件
            this.preventDefault = options.preventDefault === false ? false : true;

            //滑动时是否阻止默认事件
            this.noTouch = options.noTouch === true ? true : false;

        }

        //插件初始化
        this._init();
    }

    Sturns.prototype = {
        //修正构造函数指针
        constructor: Sturns,

        //插件初始化
        _init:function(){
          var that = this,
              scrollEleCls = that.isVertical ? "s_turnsListsV" : "s_turnsLists";

          that._addClass(that.mainEle,"s_turns");
          that._addClass(that.scrollEle,scrollEleCls);

          that.clipWidth = 0;
          that.clipHeight = 0;
          that.clipSize = 0;

          that.moveRange = 0;

          //居中模式时，当前页大小
          if(that.centerMode){
              if(that.isVertical){
                  that.pageHeight = that.mainEleH * that.centerModeScale;
                  that.clipHeight = +((that.mainEleH * (1-that.centerModeScale)/2).toFixed(1));
              }else{
                  that.pageWidth = that.mainEleW * that.centerModeScale;
                  that.clipWidth = +((that.mainEleW * (1-that.centerModeScale)/2).toFixed(1));
              }

              that.clipSize = that.isVertical ? that.clipHeight : that.clipWidth;

          }else{
              that.centerModeScale = 1;
          }

          //滚动页大小
          that.pageSize = that.isVertical ? that.pageHeight : that.pageWidth;

          //公用修正
          that._fix();

          var vendor = {
              'Webkit': 'WebkitTransform',
              'Moz': 'MozTransform',
              'O': 'OTransform',
              'ms': 'mstransform'
          }

          /***
           * transition  IE 8 9 不支持
           * transform  IE 8不支持 IE9写前缀
           * gradient IE89 不支持
           * classList IE89不支持
           * **/

          function prefixStyle(str){
             return {
                  'Webkit': "Webkit"+str.charAt(0).toUpperCase()+str.substring(1),
                  'Moz': "Moz"+str.charAt(0).toUpperCase()+str.substring(1),
                  'O': "O"+str.charAt(0).toUpperCase()+str.substring(1),
                  'ms': "ms"+str.charAt(0).toUpperCase()+str.substring(1),
                  ' ': str,
              };
          }

          //特征检测
          that.supports = (function(){
              var u = navigator.userAgent;
              var obj = {
                  //内核
                  isTrident: u.indexOf('MSIE') > 0 ? "ms" : false,
                  isPresto: u.indexOf('Presto') > 0 ? "O" : false,
                  isWebKit: u.indexOf('AppleWebKit') > 0 ? "Webkit" : false,
                  isGecko :  u.indexOf('Gecko') > 0 && u.indexOf('Firefox') > 0 ? "Moz" : false,

                  //系统或平台
                  isAndroid:/android/ig.test(u),
                  isIPhone: /iphone/ig.test(u),
                  isIPad:/ipad/ig.test(u),
              }

              //设备
              obj.isMobile = u.indexOf('Mobi')>0 || obj.isIPhone || obj.isAndroid || obj.isIPad  ||u.indexOf('480')>0;
              obj.isTablet = u.indexOf('Tablet')>0 || obj.isIPad || u.indexOf('Nexus 7')>0;

              //事件检测
              obj.isTouchPad = (/hp-tablet/gi).test(u);
              obj.hasTouch = 'ontouchstart' in window && !obj.isTouchPad;

              obj.vendor = obj.isWebKit || obj.isGecko || obj.isTrident || obj.isPresto || " ";
              obj.transition =  prefixStyle("transition")[obj.vendor]
              obj.evtStart = obj.hasTouch ? "touchstart" : "mousedown";
              obj.evtMove = obj.hasTouch ? "touchmove" : "mousemove";
              obj.evtEnd = obj.hasTouch ? "touchend" : "mouseup";
              obj.translate = obj.hasTouch ? "WebkitTransform" : prefixStyle("transform")[obj.vendor];

              return obj;
          })();

          //惰性加载
          that.setTransFn = (function(){
              if(that.isVertical){
                  return function(num){
                      //that.scrollEle.style[that.supports.translate] = "translate3d(0px,"+ num +"px,0px)";
                      that.scrollEle.style[that.supports.translate] = "translate3d(0px,"+ num +"px,0px)";
                  }
              }else{
                  return function(num){
                      //that.scrollEle.style[that.supports.translate] = "translate3d("+ num +"px,0px,0px)";
                      that.scrollEle.style[that.supports.translate] = "translate3d("+ num +"px,0px,0px)";
                  }
              }
          })();

          //that.currentPage = -that.pageWidth*(that.centerMode ? 2 : 1);
          that.currentPage = -that._fix.fixTOPage;
          //使初始化的第一页为非克隆页
          that.setTransFn(-that._fix.fixTOPage+that.clipSize);
          that.currentIndex = Math.abs((that.currentPage+that._fix.fixOZPage)/that.pageSize);


          //启动滑动监听
          that._move();

          //标记
          that._each(that.scrollEle.children,function(idx){
              this.setAttribute("data-sturns-index",idx+1);
              this.setAttribute("index",idx+1);
          });

          //克隆前后两个元素并添加到容器中
          var tempLastele = that.scrollEle.lastElementChild.cloneNode(true),
              tempFirstele = that.scrollEle.firstElementChild.cloneNode(true);
          that.scrollEle.insertBefore(tempLastele,that.scrollEle.firstElementChild);
          that.scrollEle.appendChild(tempFirstele);

          that.centerMode && fixCenterMode.call(that,that);

          //设置每个滚动也的宽度为页面宽度
          that._each(that.pages,function(idx){
              that.isVertical ?
                  this.style.height = that.pageHeight+"px" :
                  this.style.width = that.pageWidth+"px";
          });

          //设置滚动页父容器的宽度
          //that.scrollEle.style.width = (that.centerMode? that.length+4 : that.length+2) * that.pageWidth+"px";
          that.isVertical ?
              that.scrollEle.style.height = (that.centerMode? that.length+4 : that.length+2) * that.pageHeight+"px" :
              that.scrollEle.style.width = (that.centerMode? that.length+4 : that.length+2) * that.pageWidth+"px";

          that._addClass(that.scrollEle.lastElementChild,"s_turnsClone");
          that._addClass(that.scrollEle.firstElementChild,"s_turnsClone");


          //开始轮播
          that.start();

          that._addClass(that.scrollEle.children[that.centerMode ? 2 : 1],that.activeClass);

          //如果启用指示器则初始化指示器
          that.pointer && that.indicator();

          //如果指定了指示器类名则开始初始化指示器位置
          that.s_indicator && that.pointerPosition && that._addClass(that.s_indicator.parentNode,that.pointerPosition);

          that.run = run;


          //动画用
          this.aniTimer = null;
          //that.sUtils = sUtils;
        },
        //滑动事件处理
        _move:function(){
          var that = this,isDown = false,
              downX = 0, downY= 0,  //按下鼠标或者开始触摸时的坐标
              moveX = 0,moveY = 0,    //按下鼠标或者开始触摸后移动的坐标
              changeX = 0,changeY = 0;    //上两组数据之间变化的差值

          //开始拖拽事件监听
          that.mainEle.addEventListener(that.supports.evtStart,function(e){
              isDown = true;
              downX = that.supports.hasTouch ? e.touches[0].clientX : e.clientX;
              downY = that.supports.hasTouch ? e.touches[0].clientY : e.clientY;
              that.stop();
          });

          //拖拽时事件监听器
          that.mainEle.addEventListener(that.supports.evtMove,function(e){
              //判断是否拖拽状态
              if(isDown && !that.noTouch){
                  moveX = that.supports.hasTouch ? e.touches[0].clientX : e.clientX;
                  moveY = that.supports.hasTouch ? e.touches[0].clientY : e.clientY;
                  changeX = moveX - downX;
                  changeY = moveY - downY;
                  console.log(changeX);
                  //TODO
                 /* clearTimeout(that.aniTimer);
                  that.aniTimer = null;
                  that.aniTimer = setTimeout(function(){
                      that.setTransFn(that.currentPage+(that.isVertical ? changeY : changeX)+that.clipSize);
                      that.onScroll && that.onScroll.call(that,that.currentIndex,{moveX:moveX,moveY:moveY});
                  },5);*/

                  that.setTransFn(that.currentPage+(that.isVertical ? changeY : changeX)+that.clipSize);
                  that.onScroll && that.onScroll.call(that,that.currentIndex,{moveX:moveX,moveY:moveY});
              }
              //阻止默认事件
              that.preventDefault && e.preventDefault();
          });

          //拖拽事件结束监听
            that.mainEle.addEventListener(that.supports.evtEnd,function(e){
              isDown = false;

              //如果不是无缝轮播的情况下： 轮播到第一页则再不能左划，最后一页则不能右划
              if(!that.circle){
                  if((that.currentIndex === 1 && that.isBoundary && (that.isVertical ? changeY : changeX) > 0) ||
                      (that.currentIndex === that.length && that.isBoundary && (that.isVertical ? changeY : changeX) < 0)){
                      that.boundary = that.mainEleW*this.length;
                  }
              }
              //滑动时判定边界
              var changedPX = that.isVertical ? changeY : changeX;
              if(Math.abs((that.isVertical ? changeY : changeX)) > that.boundary){
                  changedPX > 0 ? that.prev() : that.next();
              }else{

                  //滑动无差值或者点击则不触发动画
                  if(changedPX !== 0){
                      that.animate && that._ani();
                      that.setTransFn(that.currentPage+that.clipSize);
                  }
              }

              !that.circle && that.isBoundary && (that.boundary = that.prevBoundary);

              that.start();

              //差值清零，以防点击触发轮播
              changeY = 0;
              changeX = 0;

              //阻止事件冒泡
              e.stopPropagation();
          });

          //用于hoverStop事件，只针对PC
          that.mainEle.addEventListener("mouseover",function(){
              if(that.hoverStop){
                  that.stop();
              }
          });
          that.mainEle.addEventListener("mouseleave",function(){
              that.start();
          });
        },

        //兼容模块  TODO
        _fix : function(){
            this._fix = {
                fixTOPage : (this.centerMode?2:1) * this.pageSize,
                fixOZ : this.centerMode?1:0,
                fixOZPage : (this.centerMode?1:0) * this.pageSize
            }
        },
        //补间模块
        _ani : function(){
            var _ = this;

            _.scrollEle.style[_.supports.transition] = "all "+ _.duringSec +"s "+ _.timingFn;
            //_.scrollEle.style.WebkitTransition = "all "+ _.duringSec +"s "+ _.timingFn;
            setTimeout(function(){
                _.scrollEle.style[_.supports.transition] = "";
                //_.scrollEle.style.WebkitTransition = "";
            },_.during)
        },
        //scrollBy 滚动多少距离
        scrollBy : function(pxNum){
            this.animate && this._ani();
            this.setTransFn(this.currentPage+pxNum);
        },
        //scrollTo 滚动到哪里
        scrollTo : function(pxNum){
            this.animate && this._ani();
            this.setTransFn(pxNum);
        },
        //scrollTo 滚动到指定页
        scrollToPage : function(pageNum){
            this.animate && this._ani();
            //var realPageNum = this.length-(this.centerMode?4 : 2);
            pageNum = pageNum > this.length ? this.length : pageNum;

            this.setTransFn(this.clipSize-this.pageSize*(pageNum+this._fix.fixOZ));

            this.currentPage = -this.pageSize*(pageNum+this._fix.fixOZ);
        },
        //开始动画
        start : function(){
            var _ = this;
            if(_.hoverStop && _.autoplay){
                _.stop();
                _.timer = setInterval(function(){_.run(_)},_.autoplaySpeed);
            }
        },

        //滚动指示器初始化
        indicator : function(){
            var _ = this,insertHtml = "";

            var s_indicator = document.createElement("div");
            s_indicator.className = "s_indicator";
            s_indicator.innerHTML = "<div></div>";
            _.mainEle.appendChild(s_indicator);
            _.s_indicator = _.mainEle.querySelector(".s_indicator>div");

            for(var i= 0,l = this.length;i<l;i++){
                insertHtml += "<div></div>"
            }
            _.s_indicator.innerHTML = insertHtml;

            _._each(_.s_indicator.children,function(el){
                _._addClass(this,_.pointerClass);
            });

            //设置指示器宽度 居中
            _.s_indicator.style.width = (_.s_indicator.children[0].getBoundingClientRect().width + 5) * _.length+"px";

            //初始化第一个指示点选中
            _._addClass(_.s_indicator.children[0],_.pointerActiveClass);

        },

        _each : function(obj,fn){
            for(var i= 0,l = obj.length;i<l;i++){
                fn.call(obj[i],i,obj[i]);
            }
        },

        stop : function(obj,fn){
            clearInterval(this.timer);
            this.timer = null;
        },

        //上一页
        prev : function(){
            if(/*this.isBoundary &&*/!this.circle && this.currentIndex === 1){
                return;
            }else{
                this.direction = "rtl";
                this.run.call(this,this);
            }
        },

        //下一页
        next : function(){
            if(/*this.isBoundary &&*/ !this.circle && this.currentIndex === this.length){
                return;
            }else{
                this.direction = "ltr";
                this.run.call(this,this);
            }
        },

        //class工具方法 为了兼容IE89,安卓2.3
        _addClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el){
                        el.classList.add(cls);
                    }
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(!new RegExp(cls).test(className)){
                        el.className += " "+cls+" ";
                    }
                }
            }
        })(),
        _removeClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el) {
                        el.classList.remove(cls);
                    }
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(reg.test(className)){
                        el.className = className.replace(reg,"");
                    }
                }
            }
        })(),
        _hasClass:(function(){
            var div = document.createElement("div");
            if(div.classList){
                return function(el,cls){
                    if(el) {
                       return el.classList.contains(cls);
                    }
                    return false;
                }
            }else{
                return function(el,cls){
                    var className = el.className,
                        reg = new RegExp("\\b"+cls+"\\b","g");
                    if(reg.test(className)){
                        return true;
                    }
                    return false;
                }
            }

        })()
    };

    //校正中心模式下动画效果
    var fixCenterMode = function(o){
        //如果是居中模式，则前端和后端分别克隆两个节点
        o.scrollEle.appendChild(o.scrollEle.children[2].cloneNode(true));
        o.scrollEle.insertBefore(o.scrollEle.lastElementChild.previousElementSibling
                .previousElementSibling.previousElementSibling.cloneNode(true),
            o.scrollEle.firstElementChild);

        //标识为克隆节点对象
        o._addClass(o.scrollEle.lastElementChild.previousElementSibling,"s_turnsClone");
        o._addClass(o.scrollEle.firstElementChild.nextElementSibling,"s_turnsClone");
    }

    //指示器运作方法
    var indicatorMove = function(obj){
        var children = obj.s_indicator.children;
        obj._each(children,function(){
            obj._removeClass(this,obj.pointerActiveClass);
        });
        obj._addClass(children[obj.currentIndex-1],obj.pointerActiveClass);
    }


    // 运动函数
    var run = function(obj){
        //方向处理
        obj.moveRange = obj.direction === "rtl" ? obj.pageSize : -obj.pageSize;

        var beforeNum = (obj.currentIndex+(obj.centerMode?0:1))%obj.length+1;
        //滚动前回调
        //obj.onScrollBeforeStart && obj.onScrollBeforeStart.call(obj,beforeNum);

        //滚动时回调
        obj.onScrollStart && obj.onScrollStart.call(obj,beforeNum);

        obj.animate && obj._ani();

        obj.setTransFn((obj.currentPage += (obj.moveRange))+obj.clipSize);
        obj.prevPageIdx = obj.currentIndex;

        //滚动后页数，无限滚动处理
        setTimeout(function(){
            var objLth = obj.length+2;

            //TODO
            //从左向右滚动时，如果滚动到克隆页，则跳转到对应的非克隆页
            if(obj.circle){
                if(obj.currentPage == ((obj.centerMode?0:1)-objLth)*obj.pageSize) {
                    obj.setTransFn(obj.clipSize - obj._fix.fixTOPage);
                    obj.currentPage = -obj._fix.fixTOPage;
                }
                //从右向左滚动时，如果滚动到克隆页，则跳转到对应的非克隆页
                if(obj.currentPage == -obj._fix.fixOZPage){
                    obj.setTransFn(obj.clipSize-(objLth-(obj.centerMode?1:2))*obj.pageSize);
                    obj.currentPage = -(objLth-(obj.centerMode?1:2))*obj.pageSize;
                }

            }else{
                var ltrFlag = obj.currentPage == -(obj._fix.fixOZ+obj.length)*obj.pageSize,
                    rtlFlag = obj.currentPage == -obj._fix.fixTOPage;

                if(ltrFlag && obj.direction === "ltr"){
                    obj.direction = "rtl";
                }

                //从右向左滚动时，如果滚动到克隆页，则跳转到对应的非克隆页
                if(rtlFlag &&  obj.direction === "rtl"){
                    obj.direction = "ltr";
                }

                if(ltrFlag || rtlFlag){
                    obj.isBoundary = true;
                }else{
                    //边界标志位复原为false。
                    obj.isBoundary = false;;
                }
            }

            //滚动完成之前回调
            obj.onScrollBeforeEnd && obj.onScrollBeforeEnd.call(obj,obj.currentIndex);

            //计算当前页
            obj.currentIndex = Math.abs((obj.currentPage+obj._fix.fixOZPage)/obj.pageSize);

            //滚动完成时回调
            obj.onScrollEnd && obj.onScrollEnd.call(obj,obj.currentIndex);

            //指示器变动
            obj.pointer && indicatorMove.call(obj,obj);

            //给当前页设置 active类
            obj._each(obj.pages,function(i,ele){
                obj._removeClass(ele,obj.activeClass);
            });

            obj._each(obj.pages,function(i,ele){
                //dataset IE8 9 10 部分支持  报错
                if(ele.dataset){
                    if(+ele.dataset.sturnsIndex === obj.currentIndex &&
                        !obj._hasClass(ele,"s_turnsClone")){
                        obj._addClass(ele,obj.activeClass);
                    }
                }else{
                    if(+ele.getAttribute("index") === obj.currentIndex &&
                        !obj._hasClass(ele,"s_turnsClone")){
                        obj._addClass(ele,obj.activeClass);
                    }
                }

            });
        },obj.during);
    }

    return Sturns;
});

