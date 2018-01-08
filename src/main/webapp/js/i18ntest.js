/**
 * Created by jony on 12/19/17.
 */

var languages = "en";

$(document).ready(function(){
    // loadProperties();

    //languages controller
    languageControl();

    //loading json file
    loadJsonFile();

});

function loadJsonFile() {
    // $.ajax()
    $("#json-show").load("/hcsdemo3/properties/languages.json",function (response, status, xhr) {
        // $("#json-show").append("<br/>"+response+status+xhr);
        var result = JSON.parse(response);
        console.log(result.languages);
        console.log(result.version);
    });
}

function languageControl() {
    $("#btn_en").click(function () {
        languages = "en";
        loadProperties();
    });

    $("#btn_zh").click(function () {
        languages = "zh";
        loadProperties();
    });
}

function loadProperties() {
    $.i18n.properties({
        name:'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
        path:'/hcsdemo3/properties/',   //注意这里路径是你属性文件的所在文件夹
        mode:'map',
        language:languages,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
        callback:function(){
            $("[data-locale]").each(function(){
                console.log($(this).data("locale"));
                $(this).html($.i18n.prop($(this).data("locale")));

            });
        }
    });
}