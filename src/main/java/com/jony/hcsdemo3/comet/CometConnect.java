package com.jony.hcsdemo3.comet;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by jony on 11/29/17.
 * @author jony
 * @version 1.0
 */
public class CometConnect {

    private HashMap<String, String> connList = new HashMap<String, String>();

    private static CometConnect sharedCometConnect = new CometConnect();
    public static CometConnect getInstance(){
        return sharedCometConnect;
    }


    /**
     *
     * @param clientId Client side marking
     * @param connId comet connect id
     * @return The client side and the comet link binds whether to succeed
     */
    public boolean bindingConnect(String clientId, String connId){

        if (null == connList.get(clientId)){

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

        String keyStr= findClientIdByConnectId(connId);

        if (keyStr != null){

            connList.remove(keyStr);
            return true;
        }else {
            System.out.println("key find failed");
        }

        return false;
    }

    /**
     * @param connId comet connect id
     * @return  client Id
     */
    private String findClientIdByConnectId (String connId){

        Iterator iterator = connList.entrySet().iterator();
        while (iterator.hasNext()){
            Map.Entry<String, String> entry = (Map.Entry<String, String>) iterator.next();

            if (connId.equals(entry.getValue()))
                return entry.getKey();
        }

        return null;
    }


    /**
     * Show comet connect list
     */
    public void showCometConnectList(){

        System.out.println("comet connect list:");

        Iterator iterator = connList.entrySet().iterator();
        while (iterator.hasNext()){
            Map.Entry<String, String> entry = (Map.Entry<String, String>) iterator.next();
            System.out.println("|"+entry.getKey()+"\t"+entry.getValue());
        }
    }
}
