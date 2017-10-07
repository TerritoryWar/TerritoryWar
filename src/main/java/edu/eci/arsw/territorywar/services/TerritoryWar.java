/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.services;

import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Nave;
import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.model.Persona;
import edu.eci.arsw.territorywar.model.Posicion;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author carlo
 */
public class TerritoryWar {
    private Map<String,Partida> partidas = new ConcurrentHashMap<>();
    private Map<String,Jugador> jugadores = new ConcurrentHashMap<>();
    
    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar
     * @param jugador1 uno de los jugadores involucrados en el enfrentamiento
     * @param jugador2 uno de los jugadores involucrados en el enfrentamiento
     */
    public void crearPartida(Jugador jugador1, Jugador jugador2){
        
    }
    
    /**
     * Termina la partida apartir de los jugadores que se estaban enfrentando
     * @param jugador1 uno de los jugadores involucrados en el enfrentamiento
     * @param jugador2 uno de los jugadores involucrados en el enfrentamiento
     */
    public void terminarPartida(Jugador jugador1, Jugador jugador2){
        
    }
    
    /**
     * Valida el acceso del jugador, es decir que el jugador existe y sus credenciales sean validas
     * @param jugador el jugador al cual se le validara su informacion para permitir el acceso
     * @return un booleano que corresponde a que el jugador efectivamente existe y sus credenciales son correctas
     */
    public boolean validarCredenciales(Jugador jugador){
        boolean ans;
        try{
            ans = jugadores.get(((Persona)jugador).getUsuario()).equals(jugador);
        }
        catch(NullPointerException ex){
            ans = false;
        }
        return ans;
    }
    
    /**
     * Registra un nuevo jugador al sistema, es decir crea el perfil de un jugador
     * @param jugador el jugador que se quiere registrar en el sistema
     */
    public void registrarJugador(Jugador jugador){
    
    }
    
    /**
     * Mueve una nave a una nueva posicion deseada 
     * @param jugador el jugador que va a mover la nave
     * @param partida la partida en donde se movera la nave
     * @param nave la nave del jugador que desea mover
     * @param posSiguiente la nueva posicion en la que el jugador quiere ubicar su nave
     */
    public void moverNave(Jugador jugador, Partida partida,Nave nave, Posicion posSiguiente){
    
    }
    
    /**
     * Valida los posibles movimientos que puede tener la nave, es decir segun el estilo de nave analiza a donde podria mover correctamente
     * @param jugador el jugador que va a mover la nave
     * @param partida la partida en donde se movera la nave
     * @param nave la nave la cual se quiere mover, y la que quiere que le analicen los posibles lugares a donde podria ir
     * @return una lista correspondiente a las posiciones a donde seria consistente mover la nave
     */
    public List<Posicion> validarMovimiento(Jugador jugador, Partida partida,Nave nave){
        return null;
    }
    
}
