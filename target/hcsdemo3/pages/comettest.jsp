<%--
  Created by IntelliJ IDEA.
  User: jony
  Date: 11/28/17
  Time: 9:48 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>push msg test</title>
    <script type="text/javascript" src="/hcsdemo3/js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="/hcsdemo3/js/comet4j.js"></script>
    <script type="text/javascript" src="/hcsdemo3/js/comettest.js"></script>
</head>
<body>


<button type="button" onclick="startConn()">start connect</button>
<button type="button" onclick="dropConn()">drop connect</button>

<p>status:<span id="status"></span></p>

<div id="msgShow">
    <p>message:</p>
</div>
</body>
</html>

