window.onload = function () {
    var obj = document.getElementById("HisVideo");
    //readyState为4时,代表完全加载了.  
    if (obj.readyState == 4) {
        //alert("加载成功!");  
        Register();
    } else {
        alert("加载失败!");
    }
    beginCallback();
}

//读文件     
function readFile(filename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.OpenTextFile(filename, 1);
    var s = "";
    while (!f.AtEndOfStream)
        s += f.ReadLine() + "\n";
    f.Close();
    return s;
}

//写文件     
function writeFile(filename, filecontent) {
    var fso, f, s;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    f = fso.OpenTextFile(filename, 8, true);
    f.WriteLine(filecontent);
    f.Close();
    alert('ok');
}

//调用oxc控件里面的函数
function beginCallback() {
    var videoCtrl = document.getElementById("HisVideo");
    document.getElementById("HisVideo").attachEvent('MS_EventCallback', MS_EventCallback);
}

//注册各种回调的方法
function Register() {
    var videoCtrl = document.getElementById("HisVideo");
    result = videoCtrl.MS_StartClient('SUPPER_NONEED_USER', '');//注册客户端
    if (result != 0) {
        alert("MS_StartClient接口错误！错误码" + result);
        return;
    }
    // 注册回调函数	
    videoCtrl.MS_SetSnapCallback(snapCallback);//注册抓拍回调函数
    videoCtrl.MS_SetHisCallback(hisCallback);//注册历史回放回调函数
    videoCtrl.MS_SetDownloadCallback(downloadCallback);//注册下载回调函数
}

//抓拍的回调函数
function snapCallback(result, result1) {
    writeFile('E:\\js.txt', result);
}

//历史视频回放的回调函数
function hisCallback(result, result1) {
    a: var his = document.getElementById('his');
    his.innerHTML = eval("[" + result + "]")[0];//.Pos
}

//下载的回调函数
function downloadCallback(result, result1) {
    a: var download = document.getElementById('download');
    download.innerHTML = result;
}

function OnBtnClickSnap() {
    var videoCtrl = document.getElementById("HisVideo");
    videoCtrl.MS_SetSnapCallback(snapCallback);
    result = videoCtrl.MS_SnapPictures(0, 0, "", "");
    if (result != 0) {
        alert("MS_SnapPictures接口错误！错误码" + result);
        return;
    }
}
//历史视频播放点击事件
function OnBtnClickhkPlayBack() {
    var videoCtrl = document.getElementById("HisVideo");
    videoCtrl.MS_SetHisCallback(hisCallback);
    playid = videoCtrl.MS_PlayBackbyTime("44060501021310000009", "2017,07,17,17,30,00", "2017,07,17,18,30,00", 0);
    if (playid < 0) {
        alert("MS_PlayBackbyTime接口错误！错误码" + playid);
        return;
    }
}

function MS_EventCallback(a, b) {
    alert(a + "    " + b);
}