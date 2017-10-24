/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.services;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Nave;
import edu.eci.arsw.territorywar.model.Partida;
import edu.eci.arsw.territorywar.model.Posicion;
import edu.eci.arsw.territorywar.mom.MessageManagment;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author carlo
 */
@Service
public class TerritoryWar {
    @Autowired
    TerritoryWarPersistence twp;
    @Autowired
    MessageManagment mm;
    
    public TerritoryWar(){
    }
    
    /**
     * Une a la partida al segundo jugador
     * @param id el id de la partida
     * @param jugador2 el jugador a unirse
     * @throws TerritoryWarException si ya esta llena la partida
     */
    public void unirAPartida(String id, Jugador jugador2) throws TerritoryWarException{
        twp.unirAPartida(id,jugador2);
        mm.reportarAmbosJugadores(twp.getPartida(id));
    }
    
    
    /**
     * Crea la partida apartir de los jugadores que se van a enfrentar con id de la partida el username del jugador que la crea
     * @param jugador uno de los jugadores involucrados en el enfrentamiento
     */
    public  void crearPartida(Jugador jugador){
        twp.crearPartida(jugador);
    }
    
    
    /**
     * Retorna todas las partidas disponibles en el servidor, es decir, partidas que aún no tienen el jugador dos
     * @return 
     */
    public  Set<Partida> getPartidasDisponibles(){
        return twp.getPartidasDisponibles();
    }
    
    /**
     * Termina la partida apartir de los jugadores que se estaban enfrentando
     * @param idPartida, el id de la partida
     */
    public  void deletePartida(String idPartida){
        twp.deletePartida(idPartida);
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
     * Mueve una nave a una nueva posicion deseada 
     * @param jugador el jugador que va a mover la nave
     * @param partida la partida en donde se movera la nave
     * @param nave la nave del jugador que desea mover
     * @param posSiguiente la nueva posicion en la que el jugador quiere ubicar su nave
     */
    public  void moverNave(Jugador jugador, Partida partida,Nave nave, Posicion posSiguiente){
    
    }
    
    /**
     * Valida los posibles movimientos que puede tener la nave, es decir segun el estilo de nave analiza a donde podria mover correctamente
     * @param jugador el jugador que va a mover la nave
     * @param partida la partida en donde se movera la nave
     * @param nave la nave la cual se quiere mover, y la que quiere que le analicen los posibles lugares a donde podria ir
     * @return una lista correspondiente a las posiciones a donde seria consistente mover la nave
     */
    public static List<Posicion> validarMovimiento(Jugador jugador, Partida partida,Nave nave){
        return null;
    }

    /**
     * regresa la partida con el id dado
     * @param id el id de la partida
     * @return 
     */
    public Partida getPartida(String id) {
        return twp.getPartida(id);
    }

    
    
}
