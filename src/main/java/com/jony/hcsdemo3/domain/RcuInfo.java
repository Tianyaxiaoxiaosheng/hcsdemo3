package com.jony.hcsdemo3.domain;

import java.io.Serializable;

/**
 * Created by jony on 11/29/17.
 */
public class RcuInfo implements Serializable{

    private String roomNum;
    private String rcuIp;
    private int rcuPort;

    public RcuInfo(String roomNum, String rcuIp, int rcuPort) {
        this.roomNum = roomNum;
        this.rcuIp = rcuIp;
        this.rcuPort = rcuPort;
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public String getRcuIp() {
        return rcuIp;
    }

    public void setRcuIp(String rcuIp) {
        this.rcuIp = rcuIp;
    }

    public int getRcuPort() {
        return rcuPort;
    }

    public void setRcuPort(int rcuPort) {
        this.rcuPort = rcuPort;
    }
}
