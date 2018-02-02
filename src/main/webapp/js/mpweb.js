/**
 * Created by jony on 1/8/18.
 */

var myApp = new Framework7();

var $$ = Dom7;

var viewData = null;

var serviceBaseImgLoc = "/hcsdemo3/images/";
var serviceImg1Array = new Array("Service_QL.png", "Service_WR.png", "Service_SH.png", "Service_SOS.png");
var serviceImg2Array = new Array("Service_QL2.png", "Service_WR2.png", "Service_SH2.png", "Service_SOS2.png");
var airconBaseImgLoc = "/hcsdemo3/images/";
var airconImg1Array = new Array("speed_stop.png", "speed_low.png", "speed_medium.png", "speed_high.png", "speed_auto.png"
    , "model_cooling.png", "model_heating.png", "model_ventilation.png", "Shengwen.png", "JiangWen.png");
var airconImg2Array = new Array("speed_stop_2.png", "speed_low_2.png", "speed_medium_2.png", "speed_high_2.png", "speed_auto_2.png"
    , "model_cooling_2.png", "model_heating_2.png", "model_ventilation_2.png", "Shengwen2.png", "JiangWen2.png");

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
    console.log("Dom onload");
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
    addEventForAirconPage();
});

myApp.onPageBeforeInit('service', function (page) {
    console.log("service onPageBeforeInit");
    addEventForServicePage();
});

//此方法不执行
myApp.onPageBeforeInit('index',function (page) {
    console.log("index onPageBeforeInit");
});

myApp.onPageBeforeInit('setting', function (page) {
    console.log("setting onPageBeforeInit");

    addEventForSettingPage();
});

//此版本无该回调
// myApp.onPageAfterAnimation('lights', function () {
// });

$$(document).on('pageInit', '.page[data-page="lights"]', function (e) {

    console.log("pageInit: lights");
    addEventForLightSwitch();
});


//login screen event,and open, opened, close, closed
//无法调用，找替代
$$("div.login-screen").on('opened', function () {  
    console.log("login-screen opened");

    //For login button add event
    $$('#login').on('click', login());

});

$$('#login').on('click', function () {
    console.log("clicked login .....");
    login();
});

$$("div.login-screen").on('closed', function () {
    console.log("login-screen closed");

    //获取视图数据
    getApartmentData();

    //根据数据，初始化子页面
    initializeSubPage();

    //侧边栏路由使用主视图
    addEventForLeftPanel();
});






//initialize subPage
function initializeSubPage() {

    myApp.showPreloader(); //开启，阻止用户操作
    console.log("start initializeSubPage");

    //initialize
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
        clone_label.text = data[i].name_zh;

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
        var label_zh = $$(clone_col).children("span.zh");
        var label_en = $$(clone_col).children("span.en");
        // label.val("123"); //无效
        label_zh.text(data[i].name_zh);
        label_en.text(data[i].name_en);


        // console.log(label);
        tab.children("div.row")[0].appendChild(clone_col);
    }
    // console.log(tab[0]);
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

//为开关按钮添加事件
function addEventForLightSwitch() {

    $$("#lights-tabs img.img-sw").on('click', function () {

        //点击事件在a元素上会响应两次（一般一个页面的第一次点击），可能是框架问题，暂不深究，只排除
        //在电脑上没问题，但在所有移动设备上此处会拦截所有的
        // if ($$(this).hasClass('active-state')){
        //     return;
        // }

        // console.log(this);
        // alert("123");

        //set new value
        var isOpenNew = !$$(this).prop('isOpen');
        $$(this).prop('isOpen', isOpenNew);

        // console.log($$(this).prop('isOpen'));

        //make show
        if ($$(this).prop('isOpen')){
            this.src="/hcsdemo3/images/ON3.png";
        }else {
            this.src="/hcsdemo3/images/OFF3.png";
        }
    });
}

//为服务页添加事件
function addEventForServicePage() {


    $$('div[data-page="service"] img.img-sv').on('click', function () {

        //set new value
        var isSelectedNew = !$$(this).prop('isSelected');
        $$(this).prop('isSelected', isSelectedNew);

        //自定义属性获取
        // console.log($$(this).attr('tag'));
        // console.log(this.getAttribute('tag'));

        var tag = this.getAttribute('tag');

        //make show
        if ($$(this).prop('isSelected')){

            this.src=serviceBaseImgLoc+serviceImg2Array[tag];
        }else {

            this.src=serviceBaseImgLoc+serviceImg1Array[tag];
        }
    });
}

//为空调页添加点击事件
function addEventForAirconPage() {
    $$('div.aircon-setting img.img-ac').on('click', function () {

        //set new value
        var isSelectedNew = !$$(this).prop('isSelected');
        $$(this).prop('isSelected', isSelectedNew);


        var tag = this.getAttribute('aircon-btn-tag');
        console.log(tag);

        //make show
        // if ($$(this).prop('isSelected')){
        //
        //     this.src=airconBaseImgLoc+airconImg2Array[tag];
        // }else {
        //
        //     this.src=airconBaseImgLoc+airconImg1Array[tag];
        // }
    });
    $$('div.aircon-setting img.img-ac').on('touchstart', function () {

        var tag = this.getAttribute('aircon-btn-tag');

        this.src=airconBaseImgLoc+airconImg2Array[tag];
    });
    $$('div.aircon-setting img.img-ac').on('touchend', function () {

        var tag = this.getAttribute('aircon-btn-tag');

        this.src=airconBaseImgLoc+airconImg1Array[tag];
    });

}



//get apartment data
function getApartmentData() {
    console.log("Get Apartment Data");

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

//Sign In
function login() {

    var loginFormData = myApp.formToJSON('#login-form');
    // console.log(loginFormData);
    // console.log(JSON.stringify(loginFormData));
    
    var login_url = "/hcsdemo3/web/login.do";
    
    $$.ajax({
        url:login_url,
        async:false,
        method:'POST',
        data:loginFormData,
        success:function (data, status, xhr) {
            console.log("login success");
            myApp.closeModal();
        }
    });
}

