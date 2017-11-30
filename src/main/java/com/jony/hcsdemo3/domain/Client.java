package com.jony.hcsdemo3.domain;

import java.io.Serializable;

/**
 * Created by jony on 11/29/17.
 */


public class Client implements Serializable{

    private String username;
    private String roomNum;
    private String clientId;
    private int type;


    //设备类型,phone,ipad,computer
    //接收指令方式,udp，long polling
    //客户端ip，port，或者交由客户端udp管理


}
