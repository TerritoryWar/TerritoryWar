/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.exceptions;

/**
 *
 * @author carlo
 */
public class TerritoryWarException extends Exception{

    public static String JUGADOR_NO_EXISTE = "El usuario que intenta acceder no existe";
    public static String CREDENCIALES_INCORRECTAS = "las credenciales son incorrectas";
    public static String USUARIO_YA_EXISTE = "El usuario ya esta registrado en la base de datos";
    public static String PARTIDA_COMPLETA = "la partida ya contiene dos jugadores";
    
    public TerritoryWarException(String message) {
        super(message);
    }

    public TerritoryWarException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
