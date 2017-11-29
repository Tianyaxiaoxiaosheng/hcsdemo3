package com.jony.hcsdemo3.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by jony on 11/29/17.
 * @author jony
 * @version 1.0
 */
public class ClientConnect {

    private HashMap<String, String> connList = new HashMap<String, String>();

    private static ClientConnect sharedClientConnect = new ClientConnect();
    public static ClientConnect getInstance(){
        return sharedClientConnect;
    }


    /**
     *
     * @param clientId Client side marking
     * @param connId comet connect id
     * @return The client side and the comet link binds whether to succeed
     */
    public boolean bindingConnect(String clientId, String connId){

        if (null == connList.get(clientId)){

//            ConnectInfo connectInfo = new ConnectInfo(clientId, connId);
            connList.put(clientId, connId);
            return true;
        }else {

            return false;
        }

    }

    /**
     *
     * @param connId comet connect id
     * @return Whether to destroy successfully
     */
    public boolean destroyedConnect(String connId){

        String keyStr= findClientByConnectId(connId);

        if (keyStr != null){

            connList.remove(keyStr);
            return true;
        }

        return false;
    }

    private String findClientByConnectId (String connId){

        Iterator iterator = connList.entrySet().iterator();
        while (iterator.hasNext()){
            Map.Entry<String, String> entry = (Map.Entry<String, String>) iterator.next();

            if (connId.equals(entry.getValue()))
                return entry.getKey();
        }

        return null;
    }
}
