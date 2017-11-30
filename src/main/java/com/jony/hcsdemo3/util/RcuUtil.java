package com.jony.hcsdemo3.util;

import com.jony.hcsdemo3.domain.SocketAddress;

import java.util.HashMap;

/**
 * Created by jony on 11/29/17.
 * 管理所以在线房间对应的RCU信息表，避免每次都去数据库查询（仅适用于少量客户端连接）
 *
 */
public class RcuUtil {


    //key 为rcu的id，value为rcu的Socket地址
   private HashMap<String, SocketAddress> rcuList = new HashMap<String, SocketAddress>();
}
