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
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author carlo
 */
@Service
public class TerritoryWar {
    private Map<String,Partida> partidas = new ConcurrentHashMap<>();
    private Map<String,Jugador> jugadores = new ConcurrentHashMap<>();
    
    public TerritoryWar(){
        
        jugadores.put("Casvad", new Jugador("Casvad", "123", "Carlos", "Casvad@gmail.com"));
        jugadores.put("Esteban7700", new Jugador("Esteban7700", "123", "Jhordy", "estebansalinas97@gmail.com"));
                
    }
    
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
     * @param username el nombre de usuario de la cuenta
     * @param password la contraseña del usaurio sin encriptar
     * @return un jugador que corresponde al jugador, solo si efectivamente existe y sus credenciales son correctas
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador no existe o las credenciales son incorrectas
     */
    public Jugador validarCredenciales(String username, String password) throws TerritoryWarException{
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
     * Registra un nuevo jugador al sistema, es decir crea el perfil de un jugador
     * @param jugador el jugador que se quiere registrar en el sistema
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador ya existe en la base de datos
     */
    public void registrarJugador(Jugador jugador) throws TerritoryWarException{
        if(jugadores.get(jugador.getUsuario())!=null){
            throw new TerritoryWarException("El usuario ya esta registrado en la base de datos");
        }
        else{
            jugadores.put(jugador.getUsuario(), jugador);
        }
        
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
