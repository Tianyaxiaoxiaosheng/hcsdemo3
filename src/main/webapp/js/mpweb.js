/**
 * Created by jony on 1/8/18.
 */

var myApp = new Framework7();

var $$ = Dom7;

var lightsRoomNames = [' 标签a ',' 标签b ',' 标签b ',' 标签b ',' 标签b ',' 标签b '];

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});


myApp.onPageInit("lights", function (page) {
    console.log("lights page init");
});

myApp.onPageBeforeInit('lights', function (page) {
    for (var i in lightsRoomNames){
        $$("#lights-tabbar").append("<a href=\"#tab2\" class=\"tab-link\">"+lightsRoomNames[i]+"</a>");

    }
});

