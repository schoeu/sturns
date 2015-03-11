/*!
 * sLib JavaScript Library v0.1.1
 *
 * http://www.schoeu.com/
 *
 * Released under the MIT license
 *
 * Date: 2014-08-01T17:42Z
 */

(function(window,undefined){
    //common type or object
    var stringType = 'string',
        arrayType = [],
        objType = {},
        toString = objType.toString,
        slice = arrayType.slice;

    var $ = function(s,c){
        return new F(s,c);
    };

    var F = function(s,c){
        return this.init(s,c);
    };

    $.fn = F.prototype;

    $.fn.init = function(s,c){
        var nodeList;
        if(s.nodeType === 1){
            this[0] = s;
        }else if(toString.call(s) === '[object NodeList]'){
            nodeList = s;
        }else{
            nodeList = (c || document).querySelectorAll(s);
        }
        this.length = nodeList.length;
        var lth = this.length;
        for(var i=0;i<lth;i++){
            this[i] = nodeList[i];
        }
        return this;
    };

    $.fn.hide = function(){
        this.each(function(){
            this.style.display = 'none';
        });
    };

    $.fn.each = function(fn){
        var i= 0,lth = this.length;
        for(;i<lth;i++){
            fn.call(this[i],i,this[i]);
        }

    };

    $.fn.prePend = function(newNode){
        var parentNode = this[0].parentNode,
            parNode = parentNode.firstChild;
        if(parNode){
            parentNode.insertBefore(newNode,parNode);
        }else{
            parentNode.appendChild(newNode);
        }
    };

    $.fn.addClass = function(cls){
        this.each(function(){
            var clsName = this.className,
                reg = new RegExp("\\b"+cls+"\\b");
            if(!clsName.match(reg)){
                this.className += " "+cls;
            }
        });
    };

    $.fn.removeClass = function(cls){
        this.each(function(){
            var clsName = el.className,
                reg = new RegExp("\\b"+cls+"\\b","g");
            this.className = clsName.replace(reg,"");
        });
    };

    $.fn.children = function(tagName){
        var parentNode = this[0],
            children = parentNode.children,arr = [];
        for(var i= 0,lth = children.length;i<lth;i++){
            var c = children[i]
            if(!tagName && c.nodeType == 1){
                arr.push(c);
            }else if(c.tagName == tagName.toUpperCase()){
                arr.push(c);
            }
        }
        return arr;
    };

    $.fn.setCss = function(attr,val){
        this.each(function(){
            if(val){
                try{
                    this.style[attr] = val;
                }catch(e){}
            }
        });
    };

    $.fn.hasCLass = function(cls){
        var el = this[0];
        if(arguments.length<1){
            throw new Error("arguments error");
        }
        var className = el.className,
            reg = new RegExp("\\b"+cls+"\\b","g");
        if(reg.test(className)){
            return true;
        }
        return false;
    };

    $.fn.isLast = function(){
        var el = this[0];
        if(!this.nextEle(el)){
            return true;
        }
        return false;
    };

    $.fn.isFirst = function(){
        var el = this[0];
        if(!this.preEle(el)){
            return true;
        }
        return false;
    };

    $.fn.closet = function(){
        var el = this[0],
            a = [], p,n;
        p = this.preEle(el);
        n = this.nextEle(el);
        if(p){a.push(p);}
        if(n){a.push(n);}
        return a;
    };

    $.fn.getIndex = function(){
        var el = this[0],
            pre = this.preSiblings(el);
        if(pre){
            return pre.length;
        }
        return null;
    };

    $.fn.nextEle = function(){
        var el = this[0];
        if(typeof el.nextElementSibling == "object"){
            return el.nextElementSibling;
        }else{
            var ne = el.nextSibling;
            while(ne){
                if(ne.nodeType == 1){
                    return ne;
                }
                ne = ne.nextSibling;
            }
        }
    };

    $.fn.preEle = function(el){
        //var el = this[0];
        if(typeof el.previousElementSibling == "object"){
            return el.previousElementSibling;
        }else{
            var pe = el.previousSibling;
            while(pe){
                if(pe.nodeType == 1){
                    return pe;
                }
                pe = pe.previousSibling;
            }
        }
    };

    $.fn.nextSiblings = function(){
        var el = this[0];
        if(!el) return [];
        var a = [], nxt = el.nextEle();
        while(nxt){
            a.push(nxt);
            nxt = nxt.nextEle();
        }
        return a;
    };

    $.fn.preSiblings = function(){
        var el = this[0],a = [];
        if(!el) return [];
        el = this.preEle(el);
        while(el){
            a.unshift(el);
            el = this.preEle(el);
        }
        return a;
    };

    $.fn.getCss = function(attr){
        var el = this[0];
        try{
            return window.getComputedStyle(el,null)[attr];//ie8+ w3c
        }catch(e){
            return el.currentStyle(attr);
        }
    };

    $.fn.css = function(attr,val){
        var para = arguments.length,el = this[0];
        if(para == 2){
            this.each(function(){
                try{
                    if(val){
                        this.style[attr] = val;
                    }
                }catch(e){
                    console.log(e.message);
                }
            });
        }else if(para == 1){
            if(typeof attr == "object"){
                for(var a in attr){
                    this.setCss(el,a,attr[a]);
                }
            }else if(typeof attr == "string"){
                try{
                    return window.getComputedStyle(el,null)[attr];//ie8+,w3c
                }catch(e){
                    return el.currentStyle(attr);
                }
            }
        }
    };

    $.fn.insertAfter = function(newNode){
        var el = this[0];
        if(el.nextElementSibling){
            el.parentNode.insertBefore(newNode,el.nextElementSibling);
        }else{
            el.parentNode.insertBefore(newNode);
        }
    };

    $.fn.siblings = function(){
        var el = this[0];
        if(el){
            return this.preSiblings(el).concat(this.nextSiblings(el));
        }
        return [];
    };

    $.fn.offset = function(){
        var el = this[0],
            l = el.offsetLeft || 0,
            t = el.offsetTop || 0,
            p = el.offsetParent;
        while(p){
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent
        }
        return {left:l,top:t};
    };

    //simple event bind
    $.fn.addEvent = function(type,fn){
        var el = this[0];
        if(el.addEventListener){
            el.addEventListener(type,fn,false);
        }else if(el.attachEvent){
            el.attachEvent("on"+type,fn);
        }
    };

    $.fn.text = function(text){
        this.each(function(){
            this.innerHTML = text;
        });
    };

    $.fn.removeEvent = function(type,fn){
        var el = this[0];
        if(el.removeEventListener){
            el.removeEventListener(type,fn,false);
        }else if(el.detachEvent){
            el.detachEvent("on"+type,fn);
        }
    }

    $.fn.bind = function(type,fn){
        this.each(function(){
            if(this.addEventListener){
                this.addEventListener(type,fn,false);
            }else if(this.attachEvent){
                this.attachEvent("on"+type,fn);
            }
        });
    }

    $.fn.unbind = function(type,fn){
        this.each(function(){
            if(this.removeEventListener){
                this.removeEventListener(type,fn,false);
            }else if(this.detachEvent){
                this.detachEvent("on"+type,fn);
            }
        });
    }

    /********  instance funciton  end*********/

    if(typeof [].distinct === 'undefined'){
        Array.prototype.distinct = function(flag){
            flag = flag || false;
            var arr = this, b = [],obj={};
            if(flag){
                for(var m= 0;m<arr.length-1;m++){
                    for(var j=m+1;j<arr.length;){
                        if(arr[m] === arr[j]){
                            arr.splice(j,1);
                        }else{
                            j++;
                        }
                    }
                }
                return arr;
            }else{
                for(var i= 0;i<arr.length;){
                    if(!obj[arr[i]]){
                        obj[arr[i]] = 1;
                        i++;
                    }else{
                        arr.splice(i,1);
                    }
                }
                return arr;
            }
        };
    }

    if(typeof ('a').trim === 'undefined'){
        String.prototype.trim = function(flag){
            var reg;
            reg = flag ? /[\s　]+/g : /^\s+|\s+$/g;
            return this.replace(reg,"");
        }
    }

    $.getCookie = function(idx){
        var reg = new RegExp(idx+"=(\\w*)","g");
        return reg.exec(document.cookie) ? reg.exec(document.cookie)[1] : "";
    };

    $.setCookie = function(idx,val,dur){
        var myCk = document.cookie;
            val = val || "";
            dur = dur || 86400000; //默认为max-age为一天
        document.cookie = idx + "=" + encodeURI(val) + ";expires=" + new Date(Date.now()+dur).toUTCString() + ";";
    };

    $.getElementsByClassName = function(clsName,context){
        var eleObj,a = [],allEl;
        if(typeof document.getElementsByClassName == "function"){
            if(context){
                return context.getElementsByClassName(clsName);
            }
            return document.getElementsByClassName(clsName);
        }else{
            if(context){
                allEl = context.getElementsByTagName("*");
            }else{
                allEl = document.getElementsByTagName("*");
            }
            for(var i= 0,l=allEl.length;i<l;i++){
                eleObj = allEl[i];
                if(eleObj.className == clsName){
                    a.push(eleObj);
                }
            }
            return a;
        }
    };

    $.getUrlParam = function(s){
        s = s || "",r = /([^?=&]+)=([^?=&]+)/g,obj={};
        while(a = r.exec(s)){
            obj[a[1]] = a[2];
        }
        return obj;
    };

    $.browser = (function(){
        var userAgent = window.navigator.userAgent;
        $.isIE = $.isChrome = $.isFireFox = $.isOpera = $.isSafari = false
        if((/MSIE/i).test(userAgent)){
            return 'ie';
        }else if((/Chrome/i).test(userAgent)){
            return 'chrome';
        }else if((/FireFox/i).test(userAgent)){
            return 'firefox';
        }else if((/Opera/i).test(userAgent)){
            return 'opera';
        }else if((/Safari/i).test(userAgent)){
            return 'safari';
        }
    })();

    $.nodelist2Array = function(nl){
        try{
            return slice.call(nl);
        }catch(e){
            var a = [];
            for(var i=0;l=nl.length;i++){
                a.push(nl[i]);
            }
            return a;
        }
    };

    /**
     *  0：请求未初始化（还没有调用 open()）。
        1：请求已经建立，但是还没有发送（还没有调用 send()）。
        2：请求已发送，正在处理中（通常现在可以从响应中获取内容头,调用了send()）。
        3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
        4：响应已完成；您可以获取并使用服务器的响应了。
     ***/
    $.ajax = function(obj){
        var url,dataType,jsonpCallback,type,success,error,async,returnData,timeout;
        if(toString.call(obj) == '[object Object]'){
            url = obj.url;
            dataType = obj.dataType || '';
            jsonpCallback = obj.jsonpCallback || '';
            type = obj.type || 'get';
            success = obj.success;
            error = obj.error;
            async = obj.async || true;
            tineout = obj.timeout || 200000;
        }else {
            console.error('$.ajax method required object arguments.');
        }

        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch(e){
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        if(/jsonp/i.test(dataType)){
            var scriptEle = document.createElement('script');
            scriptEle.type = 'text/javascript';
            scriptEle.src = url;

            var jsonpData = null;
            document.getElementsByTagName('head')[0].appendChild(scriptEle);
            var callBackFuntionName = /callback=(\w+)/i.exec(url);
            (function(jsonpData){
                arguments.callee.caller.name = callBackFuntionName[1];
                try{
                    var returnJSONObject = JSON.parse(jsonpData);
                    success.call(xhr,returnJSONObject,xhr);
                }catch(parseErr){
                    error.call(xhr,xhr,'parseerror',parseErr);
                }
            })();


        }else{
            xhr.open(type,url,async);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200 || xhr.status == 304){
                        returnData = xhr.responseText;
                        success.call(this,returnData,'success',this);
                    }else{
                        error.call(xhr,this,'errror',xhr.statusText);
                    }
                }
            };
            xhr.timeout = timeout;
            xhr.ontimeout = function(){
                xhr.abort();
                error.call(this,this,'errror',xhr.statusText);
            };
            xhr.send(null);
        }
    };

    window.sLib = $;

    window.$ === undefined && (window.$ = $);

})(window);

