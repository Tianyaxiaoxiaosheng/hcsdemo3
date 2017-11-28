<%--
  Created by IntelliJ IDEA.
  User: jony
  Date: 11/28/17
  Time: 1:42 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>


</head>
<body>

<form id="login_form" action="${pageContext.request.contextPath}/login.do" method="post"/>
    <table>
        <tr>
            <td>
                <span>username</span>
            </td>
            <td>
                <input type="text" id="username" name="username">
            </td>
        </tr>
        <tr>
            <td>
                <span>password</span>
            </td>
            <td>
                <input type="password" id="password" name="password">
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" onclick="form_submit()">登录</button>
            </td>
        </tr>
    </table>

<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</body>
</html>
