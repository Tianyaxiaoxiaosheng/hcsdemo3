package com.jony.hcsdemo3.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by jony on 11/28/17.
 */

@Controller
public class MainController {

    @RequestMapping(value = "/comettest", method = RequestMethod.GET)
    public String comettest(){
        return "comettest";
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
}
