/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.mom;


import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.services.TerritoryWar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.territorywar.model.Movimiento;

/**
 *
 * @author carlo
 */
@Controller
public class STOMPMessagesHandler {

    @Autowired
    SimpMessagingTemplate msgt;
    @Autowired
    TerritoryWar tw = null;

    @MessageMapping("/movimientos/partidas.{idPartida}")
    public void handleMoveEvent(Movimiento mov, @DestinationVariable String idPartida) throws Exception {
        Partida partida = tw.getPartida(idPartida);
        synchronized (partida) {
            msgt.convertAndSend("/topic/movimientos/partidas." + idPartida, mov);
        }

    }

    @MessageMapping("/ganador/partidas.{idPartida}")
    public void handleWinEvent(String ganador, @DestinationVariable String idPartida) throws Exception {
        // agregarle puntaje al jugador
        msgt.convertAndSend("/topic/ganador/partidas." + idPartida, ganador);
    }
}
