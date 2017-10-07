/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.model;

import java.util.List;

/**
 *
 * @author carlo
 */
public class Tablero {
    private Jugador jugador1;
    private Jugador jugador2;
    
    /**
     * Mueve una nave a una nueva posicion deseada 
     * @param jugador el jugador que va a mover la nave
     * @param nave la nave del jugador que desea mover
     * @param posSiguiente la nueva posicion en la que el jugador quiere ubicar su nave
     */
    public void moverNave(Jugador jugador,Nave nave, Posicion posSiguiente){
    
    }
    
    /**
     * Valida los posibles movimientos que puede tener la nave, es decir segun el estilo de nave analiza a donde podria mover correctamente
     * @param jugador el jugador que va a mover la nave
     * @param nave la nave la cual se quiere mover, y la que quiere que le analicen los posibles lugares a donde podria ir
     * @return una lista correspondiente a las posiciones a donde seria consistente mover la nave
     */
    public List<Posicion> validarMovimiento(Jugador jugador,Nave nave){
        return null;
    }
    
    
}
