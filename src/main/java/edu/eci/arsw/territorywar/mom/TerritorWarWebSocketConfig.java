/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.mom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

/**
 *
 * @author carlo
 */
@Configuration
@EnableWebSocketMessageBroker
public class TerritorWarWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
    
    @Value("${port}")
    private int port;
    @Value("${host}")
    private String host;
    @Value("${user_host}")
    private String user_host;
    @Value("${paswd}")
    private String paswd;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // para Heroku
        config.enableSimpleBroker("/topic"); 
        // para AWS
        /*config.enableStompBrokerRelay("/topic/").setRelayHost(host).setRelayPort(port).
                setClientLogin(user_host).
                setClientPasscode(paswd).
                setSystemLogin(user_host).
                setSystemPasscode(paswd).
                setVirtualHost(user_host);*/
        //
        config.setApplicationDestinationPrefixes("/app");
        
        
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompendpoint").setAllowedOrigins("*").withSockJS();
        
    }
    
}
