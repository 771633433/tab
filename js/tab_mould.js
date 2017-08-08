//Get the external template definition using a jQuery selector
var template = kendo.template($("#javascriptTemplate").html());

//Create some dummy data
var tab_data=[
    { tabname: "基本资料",src:"real-timevideo.html"},
    { tabname: "报警事件",src:"slide2.html"},
           { tabname: "实时视频",src:"grid_remote.html"}
]
$(function () {
    var result = template(tab_data); //Execute the template
    $("#tabstrip").html(result); //Append the result
    $("#tabs li:first").addClass("k-state-active");
    $("#tabstrip").kendoTabStrip({
        tabPosition:"bottom",
        animation:{ open: { effects: "fadeIn" }}
//            dataSource: dataSource,
//            template: kendo.template($("#template").html()),
    })
    $(".tabContent").each(function (index,element) {
        var loadHtml=element.title;
        $(this).load(loadHtml);
    })
})
