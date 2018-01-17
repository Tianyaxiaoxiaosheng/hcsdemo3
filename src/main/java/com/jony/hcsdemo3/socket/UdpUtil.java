package com.jony.hcsdemo3.socket;


import java.io.IOException;
import java.net.*;

/**
 * Created by jony on 1/16/18.
 */
public class UdpUtil {



    private static final int INPORT = 5000; //本地端口
    private DatagramSocket localSocket; //本地socket
    private boolean isReceive = true; //udp 接收标志


    private UdpUtil(){

        //localSocket init
        try {

            localSocket = new DatagramSocket(INPORT);
        } catch (SocketException e) {
            e.printStackTrace();
        }

//        startReceive();
    }

    //单类
    private static UdpUtil sharedUdpUtil = new UdpUtil();
    public static UdpUtil getInstance(){
        return sharedUdpUtil;
    }


    /**
     * udp receive
     */
    public void startReceive(){

        byte[] recvBuf = new byte[1024];
        DatagramPacket recePacket = new DatagramPacket(recvBuf, recvBuf.length);

        if (localSocket == null){
            System.out.println("localSocket is null");
            return;
        }

        new Thread(){

            @Override
            public void run() {

                System.out.println("Udp receive started !");

                try {

                    System.out.println("ip:"+ InetAddress.getLocalHost().getHostAddress()+"\tport:"+localSocket.getLocalPort());

                    while (isReceive){
                        localSocket.receive(recePacket);
                        String recvString = new String(recePacket.getData(), 0, recePacket.getLength());
                        System.out.println("udp client receive:"+recvString);

                        //测试发送
                        send(recvString, "");

                    }

                } catch (IOException e) {
                    System.out.println("udp receive error");
                    e.printStackTrace();
                } finally {
                    localSocket.close();
                }

            }
        }.start();
    }


    private void stopReceive(){

        isReceive = false;
    }


    /**
     * @param sendStr send string
     * @param keyStr target
     *@return Whether to transmit successfully
     */
   public boolean send(String sendStr, String keyStr){

       SocketAddress targetAddress = new SocketAddress("172.144.1.134", 6000);

       InetAddress address = null;

       try {
           address = InetAddress.getByName(targetAddress.getIp());
           int port = targetAddress.getPort();
           byte[] sendBuf = sendStr.getBytes();

           DatagramPacket packet = new DatagramPacket(sendBuf, sendBuf.length, address, port);
           localSocket.send(packet);
           return true;
       } catch (UnknownHostException e) {

           e.printStackTrace();
           return false;
       } catch (IOException e) {

           e.printStackTrace();
           return false;
       }

   }
}
