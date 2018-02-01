package com.jony.hcsdemo3.comet;

import com.jony.hcsdemo3.socket.UdpUtil;
import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;
import org.comet4j.core.event.*;
import org.comet4j.core.listener.DropListener;
import org.comet4j.core.listener.DyingListener;
import org.comet4j.core.listener.RemovedListener;
import org.comet4j.core.listener.RevivalListener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by jony on 11/28/17.
 */
public class ConnectListener implements ServletContextListener{

    //Order channel
    private static final String CHANNEL_ORDER = "order";

    //Status channel
    private static final String CHANNEL_STATUS = "status";


    /**
     * Context Initialized
     */
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        System.out.println("ServletContextListener");

        //启动udp接收
        UdpUtil sharedUdpUtil = UdpUtil.getInstance();
        sharedUdpUtil.startReceive();

        //comet 初始化
        cometSet();

    }

    /**
     *Context Destroyed
     */
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }


    /**
     * comet 配置
     */
    private void cometSet(){
        //Comet4J上下文，负责初始化配置、引擎对象、连接器对象、消息缓存等。
        CometContext cometContext = CometContext.getInstance();

        // 注册频道，即标识哪些字段可用当成频道，用来作为向前台传送数据的“通道”
        cometContext.registChannel(CHANNEL_ORDER);
        cometContext.registChannel(CHANNEL_STATUS);

        //获取引擎对象，并通过引擎添加监听
        CometEngine cometEngine = cometContext.getEngine();


        cometEngine.addConnectListener(new org.comet4j.core.listener.ConnectListener() {
            @Override
            public boolean handleEvent(ConnectEvent connectEvent) {

//                CometConnection conn = connectEvent.getConn();

                //Return a result where connect success for comet
//                String returnStr = "Wecome, id:"+conn.getId()+"/tip:"+conn.getClientIp();
//                CometContext.getInstance().getEngine().sendTo(CHANNEL_STATUS, conn, returnStr);

                System.out.println("Client Connect: "+connectEvent.getConn().getId());
                return false;
            }
        });

        cometEngine.addDropListener(new DropListener() {
            @Override
            public boolean handleEvent(DropEvent dropEvent) {

                System.out.println("Client Drop: "+dropEvent.getConn().getId());

                //Destroyed connect where drop
                boolean isSuccess = CometConnect.getInstance().destroyedConnect(dropEvent.getConn().getId());
                CometConnect.getInstance().showCometConnectList();
                return false;
            }
        });

        cometEngine.addDyingListener(new DyingListener() {
            @Override
            public boolean handleEvent(DyingEvent dyingEvent) {

                System.out.println("Client Dying: "+dyingEvent.getConn().getId());


                return false;
            }
        });

        cometEngine.addRevivalListener(new RevivalListener() {
            @Override
            public boolean handleEvent(RevivalEvent revivalEvent) {

                System.out.println("Client Revival: "+revivalEvent.getConn().getId());
                return false;
            }
        });

        cometEngine.addRemovedListener(new RemovedListener() {
            @Override
            public boolean handleEvent(RemovedEvent removedEvent) {

                System.out.println("Client Removed: "+removedEvent.getConn().getId());
                return false;
            }
        });
    }

}
