/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.services;

import edu.eci.arsw.territorywar.caching.TerritoryWarCache;
import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.mom.MessageManagment;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import edu.eci.arsw.territorywar.persistence.impl.TerritoryWarPersistenceMongo;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author carlo
 */
@Service
public class TerritoryWar {
    private @Autowired TerritoryWarPersistence twp;
    private @Autowired TerritoryWarCache twc;
    private @Autowired MessageManagment mm;
    
    /**
     * Une a la partida al segundo jugador
     * @param id el id de la partida
     * @param jugador2 el jugador a unirse
     * @throws TerritoryWarException si ya esta llena la partida
     */
    public void unirAPartida(String id, Jugador jugador2) throws TerritoryWarException{
        twc.unirAPartida(id,jugador2);
        System.out.println(twc.getPartida(id).getJugador1()+" JUGADOR 1");
        System.out.println(twc.getPartida(id).getJugador2()+" JUGADOR 2");
        mm.reportarAmbosJugadores(twc.getPartida(id));
    }
    
    
    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar con id de la partida el username del jugador que la crea
     * @param jugador uno de los jugadores involucrados en el enfrentamiento
     */
    public  void crearPartida(Jugador jugador){
        twc.crearPartida(jugador);
    }
    
    
    /**
     * Retorna todas las partidas disponibles en el servidor, es decir, partidas que aún no tienen el jugador dos
     * @return 
     */
    public  Set<Partida> getPartidasDisponibles(){
        return twc.getPartidasDisponibles();
    }
    
    /**
     * Termina la partida apartir de los jugadores que se estaban enfrentando
     * @param idPartida, el id de la partida
     */
    public  void deletePartida(String idPartida){
        twc.deletePartida(idPartida);
    }
    
    /**
     * Valida el acceso del jugador, es decir que el jugador existe y sus credenciales sean validas
     * @param username el nombre de usuario de la cuenta
     * @param password la contraseña del usaurio sin encriptar
     * @return un jugador que corresponde al jugador, solo si efectivamente existe y sus credenciales son correctas
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador no existe o las credenciales son incorrectas
     */
    public Jugador validarCredenciales(String username, String password) throws TerritoryWarException{
        return twp.validarCredenciales(username,password);
    }
    
    /**
     * Registra un nuevo jugador al sistema, es decir crea el perfil de un jugador
     * @param jugador el jugador que se quiere registrar en el sistema
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador ya existe en la base de datos
     */
    public  void registrarJugador(Jugador jugador) throws TerritoryWarException{
        twp.registrarJugador(jugador);
    }
    
    /**
     * regresa la partida con el id dado
     * @param id el id de la partida
     * @return 
     */
    public Partida getPartida(String id) {
        return twc.getPartida(id);
    }

    
    
}
