/**
 * Created by jony on 11/24/17.
 */

$(document).ready(function () {


    setTimeout(cometProcess);
});

function startConn() {
    JS.Engine.start("/hcsdemo3/conn");

    // setTimeout(cometProcess);
    // cometProcess();
}

function dropConn() {
    JS.Engine.stop("client request drop connect");
}

function cometProcess() {
    // JS.Engine.on('start',function(cId, channelList, engine){
    //     alert('连接已建立，连接ID为：' + cId);
    // });
    // JS.Engine.on('stop',function(cause, cId, url, engine){
    //     alert('连接已断开，连接ID为：' + cId + ',断开原因：' + cause + ',断开的连接地址：'+ url);
    // });
    
    JS.Engine.on({
        start : function (cId, channelList, engine) {
            // alert('连接已建立，连接ID为：' + cId);
            $("#status").text('连接已建立，连接ID为：' + cId);
        },
        stop : function (cause, cId, url, engine) {
            // alert('连接已断开，连接ID为：' + cId + ',断开原因：' + cause + ',断开的连接地址：'+ url);
            $("#status").text('连接已断开，连接ID为：' + cId + ',断开原因：' + cause + ',断开的连接地址：'+ url);
        },
        order: function (str) {
            // alert(str);
            $("#msgShow").append(str+"<br>");
        },
        status: function (str) {
            $("#msgShow").append(str+"<br>");
        }
        
    });
}