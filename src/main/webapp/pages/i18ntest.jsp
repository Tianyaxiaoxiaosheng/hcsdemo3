<%--
  Created by IntelliJ IDEA.
  User: jony
  Date: 12/19/17
  Time: 2:38 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>国际化测试</title>

    <script type="text/javascript" src="/hcsdemo3/js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="/hcsdemo3/js/jquery.i18n.properties.js"></script>
    <script type="text/javascript" src="/hcsdemo3/js/i18ntest.js"></script>

</head>
<body>

<label data-locale="username">用户名：</label><input type="text"><br/>
<label data-locale="password">密码：</label><input type="password"><br/>

<button type="button" id="btn_en">英文</button>
<button type="button" id="btn_zh">中文</button>

<div id="json-show">json:</div>
</body>
</html>
