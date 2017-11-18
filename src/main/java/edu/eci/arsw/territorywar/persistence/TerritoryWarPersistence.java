/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.persistence;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import org.springframework.stereotype.Service;

/**
 * @author jhord
 */
@Service
public interface TerritoryWarPersistence {
    
    /**
     * Registra un nuevo jugador al sistema, es decir crea el perfil de un jugador
     * @param jugador el jugador que se quiere registrar en el sistema
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador ya existe en la base de datos
     */
    public void registrarJugador(Jugador jugador) throws TerritoryWarException;
    
    /**
     * Valida el acceso del jugador, es decir que el jugador existe y sus credenciales sean validas
     * @param username el nombre de usuario de la cuenta
     * @param password la contraseña del usaurio sin encriptar
     * @return un jugador que corresponde al jugador, solo si efectivamente existe y sus credenciales son correctas
     * @throws edu.eci.arsw.territorywar.exceptions.TerritoryWarException si el jugador no existe o las credenciales son incorrectas
     */
    public Jugador validarCredenciales(String username, String password) throws TerritoryWarException;

}
