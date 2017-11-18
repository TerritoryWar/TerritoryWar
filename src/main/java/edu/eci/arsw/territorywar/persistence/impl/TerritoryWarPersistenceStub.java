/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.persistence.impl;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author jhord
 */
@Service
public class TerritoryWarPersistenceStub implements TerritoryWarPersistence{
    private static Map<String,Jugador> jugadores = new ConcurrentHashMap<>();

    public TerritoryWarPersistenceStub() {
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
