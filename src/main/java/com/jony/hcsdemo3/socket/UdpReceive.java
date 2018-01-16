package com.jony.hcsdemo3.socket;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

/**
 * Created by jony on 1/16/18.
 */
public class UdpReceive implements Runnable{

    private DatagramSocket localSocket;
    private byte[] recvBuf = new byte[1024];
    private DatagramPacket packet = new DatagramPacket(recvBuf, recvBuf.length);

    public void setLocalSocket(DatagramSocket localSocket) {
        this.localSocket = localSocket;
    }

    @Override
    public void run() {

        try {
            while (true){
                System.out.println("Udp receive started !");
                System.out.println("ip: "+ InetAddress.getLocalHost().getHostAddress()+"\tport: "+localSocket.getLocalPort());

                localSocket.receive(packet);

                String recvString = new String(packet.getData(), 0, packet.getLength());
                System.out.println("udp client receive:"+recvString);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            localSocket.close();
        }

    }
}
