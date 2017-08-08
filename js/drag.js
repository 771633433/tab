/**
 * Created by fc on 2017/7/31.
 */
function move() {
    window.document.onmousemove = mouseMove;
    window.document.onmouseup = mouseUp;
    window.document.ondragstart = mouseStop;
}
var clickLeft;
var clickTop;
var dragObj;
//判断是执行图片拖拽事件还是点击事件
var dragtag=false;
var startTime;
var endTime;
function mouseDown(e) {
    e.preventDefault();
    startTime=new Date().getTime();
    dragObj = e.currentTarget;
    if (dragObj !== null) {
       clickLeft = window.event.x - parseInt(dragObj.style.left?dragObj.style.left:0);
        clickTop = window.event.y - parseInt(dragObj.style.top?dragObj.style.top:0);
        // window.dragObj.style.zIndex += 1;
    }
}
function mouseStop() {
   event.returnValue = false;
}

function mouseMove(e) {
    e.preventDefault();
    if (dragObj) {
        dragObj.style.left = (window.event.x - clickLeft)+"px";
        dragObj.style.top = (window.event.y - clickTop)+"px";
    }
}

function mouseUp() {
    endTime = new Date().getTime();
    window.dragObj = null;
    if( (endTime - startTime)>200){
        dragtag = true;
    }else{
        dragtag = false;
    }
}