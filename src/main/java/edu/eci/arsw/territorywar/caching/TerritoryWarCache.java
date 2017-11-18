/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.caching;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import java.util.Set;

/**
 *
 * @author carlo
 */
public interface TerritoryWarCache {
    
    /**
     * Retorna todas las partidas disponibles en el servidor, es decir, partidas que aún no tienen el jugador dos
     * @return 
     */
    public Set<Partida> getPartidasDisponibles();
    
    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar con id de la partida el username del jugador que la crea
     * @param jugador uno de los jugadores involucrados en el enfrentamiento
     */
    public void crearPartida(Jugador jugador);
    
    /**
     * Une a la partida al segundo jugador
     * @param id el id de la partida
     * @param jugador2 el jugador a unirse
     * @throws TerritoryWarException si ya esta llena la partida
     */
    public void unirAPartida(String id,Jugador jugador2) throws TerritoryWarException;
    
    /**
     * Retorna la partida segun el id
     * @param id el id de la partida
     * @return la partida con dicho id
     */
    public  Partida getPartida(String id);
    
    /**
     * elimina la partida, si no hay partidas con ese id, no hace nada
     * @param idPartida, el id de la partida
     */
    public void deletePartida(String idPartida);
    
}
