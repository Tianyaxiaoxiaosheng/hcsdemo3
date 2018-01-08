package com.jony.hcsdemo3.controller;

import com.jony.hcsdemo3.comet.CometConnect;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by jony on 11/28/17.
 */

@Controller
public class MainController {

    @RequestMapping(value = "/comettest", method = RequestMethod.GET)
    public String comettest(){
        return "comettest";
    }

    @RequestMapping(value = "/i18ntest", method = RequestMethod.GET)
    public String i18ntest(){
        return "i18ntest";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(){
        return "login";
    }

    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    public String login(String username,String password) {


        if ("123456".equals(username) && "123456".equals(password)) {

            return "loginSuccess";


        }else {
            return "loginError";
        }

    }

    @RequestMapping(value = "/bind.do", method = RequestMethod.POST)
    @ResponseBody
    public String connectBind(String clientId, String connId){

        boolean isSuccess = CometConnect.getInstance().bindingConnect(clientId, connId);

//        ajax 响应text和xml
        return isSuccess+"";

    }

    @RequestMapping(value = "/send.do", method = RequestMethod.POST)
    @ResponseBody
    public String sendMessage(String clientId, String msg){
        return "false";
    }
}
