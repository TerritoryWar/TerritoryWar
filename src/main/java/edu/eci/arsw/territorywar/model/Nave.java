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
public abstract class Nave {
    private Posicion posicion;
    
    /**
     * Valida los posibles movimientos a donde puede llegar sobre el tablero 
     * @return una lista correspondiente a las posiciones a donde seria consistente mover la nave
     */
    public abstract List<Posicion> posiblesMovimientos();

    /**
     * @return the posicion
     */
    public Posicion getPosicion() {
        return posicion;
    }

    /**
     * Cambia la posicion de la nave de acuerdo a donde vayan a mover la nave
     * @param posicion la posicion a donde se desea mover la nave
     */
    public void setPosicion(Posicion posicion) {
        this.posicion = posicion;
    }
    
    
            
}
