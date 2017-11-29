package com.jony.hcsdemo3.domain;

import java.io.Serializable;

/**
 * Created by jony on 11/29/17.
 */
public class ConnectInfo implements Serializable{

    private String username;
    private String connId;

    public ConnectInfo(String username, String connId) {
        this.username = username;
        this.connId = connId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getConnId() {
        return connId;
    }

    public void setConnId(String connId) {
        this.connId = connId;
    }
}
