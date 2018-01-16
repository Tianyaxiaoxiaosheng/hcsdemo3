package com.jony.hcsdemo3.socket;


import java.net.DatagramSocket;
import java.net.SocketException;

/**
 * Created by jony on 1/16/18.
 */
public class UdpUtil {



    private static final int INPORT = 5000;
    private DatagramSocket localSocket;
    private Thread recriveThread = new Thread(new UdpReceive());


    private UdpUtil(){

        try {
            localSocket = new DatagramSocket(INPORT);
        } catch (SocketException e) {
            e.printStackTrace();
        }

        startReceive();
    }

    private static UdpUtil sharedUdpUtil = new UdpUtil();
    public static UdpUtil getInstance(){
        return sharedUdpUtil;
    }



    private void startReceive(){
        recriveThread.start();
    }
    private void stopReceive(){
        recriveThread.interrupt();
    }


   public boolean send(String sendStr, String keyStr){

        SocketAddress sa = new SocketAddress("192.168.0.1", 8880);

        UdpSend udpSend = new UdpSend(localSocket, sendStr,sa);
        udpSend.start();
        return true;
   }
}
