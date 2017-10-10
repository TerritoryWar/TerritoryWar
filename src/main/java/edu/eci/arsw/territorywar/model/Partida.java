/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.model;

/**
 *
 * @author carlo
 */
public class Partida {
    private Tablero tablero;
    private String partidaId;

    public Partida(){
        
    }
    
    /**
     * Crea una partida con el jugador indicado
     * @param partidaId el id de la partida
     * @param jugador1 el jugador 1
     */
    public Partida(String partidaId,Jugador jugador1){
        this.partidaId = partidaId;
        tablero = new Tablero();
        tablero.setJugador1(jugador1);
    }
    
    
    public void setJugador2(Jugador jugador2){
        tablero.setJugador2(jugador2);
    }

    /**
     * @return the partidaId
     */
    public String getPartidaId() {
        return partidaId;
    }

    /**
     * @param partidaId the partidaId to set
     */
    public void setPartidaId(String partidaId) {
        this.partidaId = partidaId;
    }
}
