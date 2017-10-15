/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.mom;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.services.TerritoryWar;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author carlo
 */
@Controller
public class STOMPMessagesHandler {

    @Autowired
    SimpMessagingTemplate msgt;
    @Autowired 
    TerritoryWar tw=null;
    
    /**
     * Maneja la conexion entre los dos jugadores para comenzar a jugar
     * @param jugador2 el jugador a conectarse a la partida
     * @param id el id de la partida
     */
    @MessageMapping("/joinGame.{id}")    
    public void handleUnirsePartida(Jugador jugador2,@DestinationVariable String id){
        System.out.println("Uniendose a la partida: "+jugador2+" con id:"+id);
        try {
            tw.unirAPartida(id,jugador2);
            msgt.convertAndSend("/topic/partidas."+id, tw.getPartida(id));
        } catch (TerritoryWarException ex) {
            //MANEJAR EVENTO DE QUE YA LA PARTIDA ESTA COMPLETA
        }
    }
    
}
