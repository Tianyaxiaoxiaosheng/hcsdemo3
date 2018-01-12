/**
 * Created by jony on 1/8/18.
 */

var myApp = new Framework7();

var $$ = Dom7;

var viewData = null;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

//dom loading finish event
window.onload = function () {

    // //初始化子页面
    // console.log("Dom onload");
    // initializeSubPage();
    //
    // //侧边栏路由使用主视图
    // addEventForLeftPanel();
};

//page event
myApp.onPageInit("lights", function (page) {
    // console.log("lights page init");
});

myApp.onPageBeforeInit('lights', function (page) {
    console.log("lights onPageBeforeInit");
});

myApp.onPageBeforeInit('aircon', function (page) {
    console.log("aircon onPageBeforeInit");
});

myApp.onPageBeforeInit('service', function (page) {
    console.log("service onPageBeforeInit");
});

//此方法不执行
myApp.onPageBeforeInit('index',function (page) {
    console.log("index onPageBeforeInit");
});

myApp.onPageBeforeInit('setting', function (page) {
    console.log("setting onPageBeforeInit");

    addEventForSettingPage();
});


//login screen event,and open, opened, close, closed
$$("div.login-screen").on('closed', function () {
    console.log("login-screen closed");

    //初始化子页面
    console.log("Dom onload");
    initializeSubPage();

    //侧边栏路由使用主视图
    addEventForLeftPanel();
});




//initialize subPage
function initializeSubPage() {

    myApp.showPreloader(); //开启，阻止用户操作
    console.log("start initializeSubPage");

    //1.get data
    getApartmentData();

    //2.initialize
    if (viewData != null)
    {
        //initialize lights page
        var lights_toolbar_inner = $$("div#lights-tabbar")[0];
        var lights_tabs = $$("div#lights-tabs")[0];
        createdLabelNavigation(lights_toolbar_inner, lights_tabs, viewData.lights);

        //initialize aircon page
        var aircon_toolbar_inner = $$("div#aircon-tabbar")[0];
        var aircon_tabs = $$("div#aircon-tabs")[0];
        createdLabelNavigation(aircon_toolbar_inner, aircon_tabs, viewData.aircon);
    }else {
        console.log("view data is null");
    }

    myApp.hidePreloader();//关闭
}

//building navigation for page
function createdLabelNavigation(toolbar_inner, tabs, data) {

    // console.log(toolbar_inner);
    // console.log(tabs);

    //check Parameter
    // console.log(data);
    if(data.length <= 0)
        return false;

    //get first node
    var label_temp = toolbar_inner.children[0];
    var tab_temp = tabs.children[0];

    //remove from present
    label_temp.remove();
    tab_temp.remove();

    // console.log(label_temp);
    // console.log(tab_temp);


    for (var i = 0; i < data.length; i++){

        //dom7 not clone function, using js
        var clone_tab = tab_temp.cloneNode(true);
        var clone_label = label_temp.cloneNode(true);

        //set val
        clone_tab.id = data[i].name;
        // clone_tab.append("tab"+i); //手机上在此卡主，append在手机上无法执行
        // clone_tab.appendChild("tab"+i);//此方法只能加节点
        // clone_tab.text = "tab"+i; //也是无效的

        //向div 添加文本的方法
        // var para=document.createElement("p");
        // var node=document.createTextNode(data[i].name);
        // para.appendChild(node);
        // clone_tab.appendChild(para);


        clone_label.href ="#"+clone_tab.id;
        clone_label.text = data[i].name;

        //First active
        if (i == 0){

            clone_label.className = clone_label.className+" active";
            clone_tab.className = clone_tab.className+" active";
        }

        //add
        // tabs.append(clone_tab);
        // toolbar_inner.append(clone_label);
        tabs.appendChild(clone_tab);
        toolbar_inner.appendChild(clone_label);

        //如果是灯就执行,放在最后
        if (data[i].hasOwnProperty("switches")){
            var newTab = $$("div #"+clone_tab.id);
            // console.log(newTab);
            createdSwitchTab(newTab, data[i].switches);
        }
    }

    return true;
}

//building switch tab
function createdSwitchTab(tab, data) {

    //check data
    if (data.length <= 0){
        return ;
    }

    var col_temp = tab.find("div.row >div");
    col_temp.remove();
    // console.log(col_temp); //包装集对象
    // console.log(col_temp[0]); //dom


    for (var i in data){

        var clone_col = col_temp[0].cloneNode(true);
        // $$(clone_col).children("span").text;
        var label = $$(clone_col).children("span");
        // label.val("123"); //无效
        label.text(data[i].name);

        // console.log(label);
        tab.children("div.row")[0].appendChild(clone_col);
    }
    // console.log(tab[0]);
}

//get apartment data
function getApartmentData() {
    var apartment = 1;
    var apartment_url = "/hcsdemo3/properties/apartment"+apartment+".json";
    
    // $$.ajax(apartment_url, function (data) {
    //
    // })
    $$.ajax({
        url:apartment_url,
        async:false,
        success:function (data, status, xhr) {

            viewData = JSON.parse(data);
        },
        error:function (xhr, status) {
            console.log(status);
        }
    });

}

// 绑定ajax回调
$$(document).on('ajaxStart', function (e) {
    // var xhr = e.detail.xhr;
    console.log('request start');
    // myApp.showPreloader();
});

$$(document).on('ajaxError', function (e) {
    console.log("request Error");
});

$$(document).on('ajaxSuccess', function (e) {
    console.log("request Success");
});

$$(document).on('ajaxComplete', function (e) {
    console.log("request complete");
    // myApp.hidePreloader();
});

//为侧边栏的导航添加事件
function addEventForLeftPanel() {
    // console.log($$("div.panel-left a"));
    $$("div.panel-left a").on('click', function () {
        // console.log(this);
        myApp.closePanel();
        mainView.router.load({pageName: this.name});
    });
}

//为设置页添加事件
function addEventForSettingPage() {

    console.log("addEventForSettingPage");


    // $$("#language label.label-radio").on('click', function () {
    //
    //     console.log(this);
    //
    //     if ($$(this).children('input').checked){
    //         console.log(this.children('input'));
    //     }
    // });

    //language
    $$("#language").on('change', function () {
        // console.log($$("#language").find("input:checked").valueOf()); //valueOf获取不到值

        var language = $$("#language").find("input:checked")[0].value; //获取到input对象后转Dom对象，再取值
        console.log(language);
    });

    //themes
    $$("#themes").on('change', function () {

        var themes_value = $$("#themes").find("input:checked")[0].value;
        console.log(themes_value);
        setLayoutThemes(themes_value);
    });
}

function setLayoutThemes(themes_value) {
    $$("body")[0].className = "layout-"+themes_value;
}


