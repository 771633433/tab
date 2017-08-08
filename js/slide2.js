var slider_data=[ { name: "Jane Doe1",src:"pictures/1.jpg",cphm:"Y88888",date:"2017-7-20",time:"10:00"},
    { name: "Jane Doe2",src:"pictures/2.jpg",cphm:"Y88888",date:"2017-7-20",time:"10:00"},
    { name: "Jane Doe3",src:"pictures/3.jpg",cphm:"Y88888",date:"2017-7-20",time:"10:00"},
    { name: "Jane Doe4",src:"pictures/4.jpg",cphm:"Y88888",date:"2017-7-20",time:"10:00"},
    { name: "Jane Doe5",src:"pictures/7.png",cphm:"Y88888",date:"2017-7-20",time:"10:00"},
    { name: "Jane Doe6",src:"pictures/5.jpg",cphm:"Y88888",date:"2017-7-20",time:"10:00"}
]
var data2;
$(function() {
    $("html").niceScroll();
    $("#listView").niceScroll({
        cursorcolor: "#2e6da4",
        cursorborder: "0px solid #2e6da4",// CSS方式定义滚动条边框
        autohidemode: true
    });
    var listSource = new kendo.data.DataSource({
        data: slider_data,
    });
    $("#listView").kendoListView({
        dataSource: listSource,
        template: kendo.template($("#template").html()),
    });
    //listview加载完成后，更换data顺序
    data2=slider_data.reverse();
});
var index="";
//当图片翻转为反面时，根据positive判断是否将正面翻转过来之后再切换下一页或上一页
var positive=true;
// liIndex当前点击图片的位置
var liIndex;
//图片切换模板绑定
var pageturn = kendo.template($("#template2").html());
var imgWidth=650;
var imgHeight=370;
var imgSlider;
function op(self) {
    imgSlider=$("#imgSlider").kendoSlider({
        increaseButtonTitle: "Right",
        decreaseButtonTitle: "Left",
        change: sliderOnChange,
        slide: sliderOnSlide,
        min: 100,
        max: 200,
        smallStep: 10,
        largeStep: 10
    }).data("kendoSlider"),
        setValue = function(e) {
            var value = parseInt(100);
            imgSlider.value(value);
        }
   //      liIndex当前点击图片的位置
    liIndex=$(self).parent().index();
    liIndex=data2.length-liIndex;
    var picResult = pageturn(data2); //Execute the template
    $("#book").html(picResult); //Append the result
    $('#book li').eq(liIndex-1).addClass("current").removeClass("others");
    if(liIndex-1!="0"){
        var pageNum=data2.length;
        if(liIndex==pageNum){
            $("#wrap").addClass("first-page").removeClass("last-page");
        }else{
            $("#wrap").removeClass("last-page");
        }
    }else{
        $("#wrap").addClass("last-page").removeClass("first-page");
    }
    var el = kendo.fx($("#book"));
    $(".album-cover").click(function() {
        if(dragtag){
            return false;
        }else{
            positive=false;
            index=$(this).attr("data-title");
            flip = el.flip("vertical", $("#album-cover"+index), $("#album-contents_"+index));
            zoom = el.zoomIn().startValue(1).endValue(1);
            flip.add(zoom).duration(200);
            flip.stop().play();
            dragtag=false;
        }
    });
    $(".album-contents").click(function() {
        startTime=new Date().getTime();
        if( (endTime - startTime)>200){
            return false;
        }else{
            positive=true;
            index=$(this).attr("data-title");
            flip = el.flip("vertical", $("#album-cover"+index), $("#album-contents_"+index));
            zoom = el.zoomIn().startValue(1).endValue(1);
            flip.add(zoom).duration(200);
            flip.stop().reverse();
        }
    });
    move();
    $("#myModal").fadeIn();
}
function current(page) {
    var book = $("#book"),
        pages = book.children("li"),
        pagesCount = pages.length,
        current = pages.filter(".current"),
        currentIndex = pagesCount - current.index(),
        newPage;

    if (!arguments.length) {
        return currentIndex;
    }
//            if (book.data("animating")) {
//                return;
//            }

    $("#wrap").toggleClass("first-page", page == 1)
        .toggleClass("last-page", page == pagesCount);

    if (page != currentIndex) {
        current.removeClass("current");
        newPage = pages.eq(pagesCount - page).addClass("current");
        if (page > currentIndex) {
            kendo.fx(book).pageturnHorizontal(current, newPage).play();
        } else {
            kendo.fx(book).pageturnHorizontal(newPage, current).reverse();
        }
    }
}
$("#previous").click(function(e) {
    e.preventDefault();
    liIndex=liIndex+1;
    var value = parseInt(100);
    imgSlider.value(value);

    if(!positive){
        flip.stop().reverse();
        positive=true;
    }
    current(Math.max(1, current() - 1));
});

$("#next").click(function(e) {
    e.preventDefault();
    liIndex=liIndex-1;
    var value = parseInt(100);
    imgSlider.value(value);
    if(!positive){
        flip.stop().reverse();
        positive=true;
    }
    current(Math.min(slider_data.length, current() + 1));
});
    //    //   图片缩放功能
    function sliderOnChange(e) {
        var elem = $("#book img").eq(liIndex-1);
        var cpu = e.value/100;
        elem[0].style.width = imgWidth * cpu +"px";
        elem[0].style.height = imgHeight * cpu +"px";
        if(cpu==1){
            $("#book li").eq(liIndex-1)[0].style.left="0px";
            $("#book li").eq(liIndex-1)[0].style.top="0px";
        }
    }

function sliderOnSlide(e) {
    var elem = $("#book img").eq(liIndex-1);
    var cpu = e.value/100;
    elem[0].style.width = imgWidth * cpu +"px";
    elem[0].style.height = imgHeight * cpu +"px";
    if(cpu==1){
        $("#book li").eq(liIndex-1)[0].style.left="0px";
        $("#book li").eq(liIndex-1)[0].style.top="0px";
    }
}
$("#closeImg").click(function () {
    $("#myModal").fadeOut();
})
