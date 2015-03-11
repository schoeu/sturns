/**
 * Created by schoeu on 2015/3/3.
 */

var singleDemo = new Sturns(".singleDemo");

var singleDemoCenter = new Sturns(".singleDemoCenter",{
    autoplay: false,
    centerMode : true,
    circle:false,
});

var singleDemoV = new Sturns(".singleDemoV",{
    autoplay: false,
    circle:false,
    isVertical:true,
    pointer:false,
    onScroll:function(idx,obj){
        //console.log("µÚ"+idx+"Ò³£¬ moveX: "+obj.moveX+" moveY: "+obj.moveY);
    }
});

var singleDemoVCenter = new Sturns(".singleDemoVCenter",{
    autoplay: false,
    centerMode : true,
    isVertical:true,
});

var picDemo = new Sturns(".picDemo",{
    centerMode : true,
    isVertical:false,
    centerModeScale: 0.6,
    noTouch:true
});
