package com.jony.hcsdemo3.socket;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * Created by jony on 1/16/18.
 */
public class UdpSend extends Thread{

    private DatagramSocket localSocket;
    private String sendStr;
    private SocketAddress targetAddress;

    public UdpSend(DatagramSocket localSocket, String sendStr, SocketAddress targetAddress) {
        this.localSocket = localSocket;
        this.sendStr = sendStr;
        this.targetAddress = targetAddress;
    }

//    public void setLocalSocket(DatagramSocket localSocket) {
//        this.localSocket = localSocket;
//    }
//
//    public void setSendStr(String sendStr) {
//        this.sendStr = sendStr;
//    }
//
//    public void setTargetAddress(SocketAddress targetAddress) {
//        this.targetAddress = targetAddress;
//    }

    @Override
    public void run() {

        try {
            InetAddress address = InetAddress.getByName(targetAddress.getIp());
            int port = targetAddress.getPort();
            byte[] sendBuf = sendStr.getBytes();

            DatagramPacket packet = new DatagramPacket(sendBuf, sendBuf.length, address, port);
            localSocket.send(packet);

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            System.out.println("Udp send error");
        }

    }
}
