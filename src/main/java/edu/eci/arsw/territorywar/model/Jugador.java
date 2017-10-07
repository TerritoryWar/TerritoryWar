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
public interface Jugador {
    
    /**
     * Valida el acceso del jugador, es decir que el jugador existe y sus credenciales sean validas
     * @param jugador el jugador al cual se le validara su informacion para permitir el acceso
     * @return un booleano que corresponde a que el jugador efectivamente existe y sus credenciales son correctas
     */
    public boolean validarCredenciales(Jugador jugador);
    
}

