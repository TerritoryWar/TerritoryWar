/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.model;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;

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
    
    
    public synchronized void setJugador2(Jugador jugador2) throws TerritoryWarException{
        if(tablero.getJugador2()!=null){
            throw new TerritoryWarException(TerritoryWarException.PARTIDA_COMPLETA);
        }
        tablero.setJugador2(jugador2);
    }
    
    public Jugador getJugador1(){
        return tablero.getJugador1();
    }
    
    public Jugador getJugador2(){
        return tablero.getJugador2();
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
