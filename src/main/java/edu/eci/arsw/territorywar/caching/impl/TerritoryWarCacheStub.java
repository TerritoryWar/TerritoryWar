/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.caching.impl;

import edu.eci.arsw.territorywar.caching.TerritoryWarCache;
import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author carlo
 */
//@Service
public class TerritoryWarCacheStub implements TerritoryWarCache{

    private static Map<String, Partida> partidas = new ConcurrentHashMap<>();

    /**
     * Retorna todas las partidas disponibles en el servidor, es decir, partidas
     * que aún no tienen el jugador dos
     *
     * @return
     */
    @Override
    public Set<Partida> getPartidasDisponibles() {
        Set<Partida> ans = new HashSet<>();
        for (Partida p : partidas.values()) {
            if (p.getJugador2() == null) {
                ans.add(p);
            }
        }
        return ans;
    }

    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar con id de
     * la partida el username del jugador que la crea
     *
     * @param jugador uno de los jugadores involucrados en el enfrentamiento
     */
    @Override
    public void crearPartida(Jugador jugador) {
        partidas.put(jugador.getId(), new Partida(jugador.getId(), jugador));
    }

    /**
     * Une a la partida al segundo jugador
     *
     * @param id el id de la partida
     * @param jugador2 el jugador a unirse
     * @throws TerritoryWarException si ya esta llena la partida
     */
    @Override
    public void unirAPartida(String id, Jugador jugador2) throws TerritoryWarException {
        partidas.get(id).setJugador2(jugador2);
    }

    /**
     * Retorna la partida segun el id
     *
     * @param id el id de la partida
     * @return la partida con dicho id
     */
    @Override
    public Partida getPartida(String id) {
        return partidas.get(id);
    }

    @Override
    /**
     * Elimina las partidas segun id
     */
    public void deletePartida(String idPartida) {
        partidas.remove(idPartida);
    }

    /**
     * Retorna todas las partidas
     * @return las partidas
     */
    public static Map<String, Partida> getPartidas() {
        return partidas;
    }

    /**
     * Cambia las partidas
     * @param aPartidas las nuevas partidas
     */
    public static void setPartidas(Map<String, Partida> aPartidas) {
        partidas = aPartidas;
    }

}
