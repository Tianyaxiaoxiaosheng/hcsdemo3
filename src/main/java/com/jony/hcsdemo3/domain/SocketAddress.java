package com.jony.hcsdemo3.domain;

import java.io.Serializable;

/**
 * Created by jony on 11/29/17.
 */
public class SocketAddress implements Serializable{

    private String ip;
    private int port;

    public SocketAddress(String ip, int port) {
        this.ip = ip;
        this.port = port;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }
}
