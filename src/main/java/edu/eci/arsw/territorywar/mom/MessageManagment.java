/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.mom;

import edu.eci.arsw.territorywar.model.Partida;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author jhord
 */
@Service
public class MessageManagment {
    private @Autowired SimpMessagingTemplate msgt;
    
    /**
     * Reportarle a ambos jugadores que ya la partida esta completa para iniciar a jugar
     * @param p la partida que debe ser notificada como lista para ambos jugadores
     */
    public void reportarAmbosJugadores(Partida p){
        msgt.convertAndSend("/topic/partidas."+p.getPartidaId(),p);
    }
    
}
