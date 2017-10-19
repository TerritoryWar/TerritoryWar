/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.persistence.impl;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author jhord
 */
@Service
public class TerritoryWarPersistenceDataStructures implements TerritoryWarPersistence{
    private static  Map<String,Partida> partidas = new ConcurrentHashMap<>();
    private static Map<String,Jugador> jugadores = new ConcurrentHashMap<>();

    public TerritoryWarPersistenceDataStructures() {
        jugadores.put("Casvad", new Jugador("Casvad", "123", "Carlos", "Casvad@gmail.com"));
        jugadores.put("Esteban7700", new Jugador("Esteban7700", "123", "Jhordy", "estebansalinas97@gmail.com"));
    }
    
    /**
     * Registra un nuevo jugador al sistema, es decir crea el perfil de un jugador
     * @param jugador el jugador que se quiere registrar en el sistema
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador ya existe en la base de datos
     */
    @Override
    public  void registrarJugador(Jugador jugador) throws TerritoryWarException{
        if(jugadores.get(jugador.getUsuario())!=null){
            throw new TerritoryWarException(TerritoryWarException.USUARIO_YA_EXISTE);
        }
        else{
            jugadores.put(jugador.getUsuario(), jugador);
        }
    }
    
    /**
     * Valida el acceso del jugador, es decir que el jugador existe y sus credenciales sean validas
     * @param username el nombre de usuario de la cuenta
     * @param password la contraseña del usaurio sin encriptar
     * @return un jugador que corresponde al jugador, solo si efectivamente existe y sus credenciales son correctas
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador no existe o las credenciales son incorrectas
     */
    @Override
    public Jugador validarCredenciales(String username, String password) throws TerritoryWarException {
        Jugador ans;
        try{
            if(jugadores.get(username).validarContraseña(password)){
                ans=jugadores.get(username);
            }
            else{
                throw new TerritoryWarException(TerritoryWarException.CREDENCIALES_INCORRECTAS);
            }
        }
        catch(NullPointerException ex){
            throw new TerritoryWarException(TerritoryWarException.JUGADOR_NO_EXISTE);
        }
        return ans;
    }
    
    /**
     * Retorna todas las partidas disponibles en el servidor, es decir, partidas que aún no tienen el jugador dos
     * @return 
     */
    @Override
    public Set<Partida> getPartidasDisponibles() {
       Set<Partida> ans = new HashSet<>();
        for (Partida p : partidas.values()) {
            if(p.getJugador2()==null){
                ans.add(p);
            }
        }
        return ans;
    }
    
    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar con id de la partida el username del jugador que la crea
     * @param jugador uno de los jugadores involucrados en el enfrentamiento
     */
    @Override
    public void crearPartida(Jugador jugador) {
        partidas.put(jugador.getUsuario(), new Partida(jugador.getUsuario(),jugador));   
    }
    
    /**
     * Une a la partida al segundo jugador
     * @param id el id de la partida
     * @param jugador2 el jugador a unirse
     * @throws TerritoryWarException si ya esta llena la partida
     */
    @Override
    public void unirAPartida(String id,Jugador jugador2) throws TerritoryWarException{
        partidas.get(id).setJugador2(jugador2);
    }
    
    /**
     * Retorna la partida segun el id
     * @param id el id de la partida
     * @return la partida con dicho id
     */
    @Override
    public  Partida getPartida(String id){
        return partidas.get(id);
    }
    
    /**
     * @return the partidas
     */
    public static Map<String,Partida> getPartidas() {
        return partidas;
    }

    /**
     * @param aPartidas the partidas to set
     */
    public static void setPartidas(Map<String,Partida> aPartidas) {
        partidas = aPartidas;
    }

    /**
     * @return the jugadores
     */
    public static Map<String,Jugador> getJugadores() {
        return jugadores;
    }

    /**
     * @param aJugadores the jugadores to set
     */
    public static void setJugadores(Map<String,Jugador> aJugadores) {
        jugadores = aJugadores;
    }
}
