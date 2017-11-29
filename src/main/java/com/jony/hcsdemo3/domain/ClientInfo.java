package com.jony.hcsdemo3.domain;

import java.io.Serializable;

/**
 * Created by jony on 11/29/17.
 */
public class ClientInfo implements Serializable{

    private String username;
    private String roomNum;
    private int type;

    public ClientInfo(String username, String roomNum, int type) {
        this.username = username;
        this.roomNum = roomNum;
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
