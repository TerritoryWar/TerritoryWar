/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.persistence.impl;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 2105534
 */
//@Service
public class TerritoryWarPersistenceMongoIntermediary implements TerritoryWarPersistence{
    @Autowired TerritoryWarPersistenceMongo twpm;
    
    @Override
    public void registrarJugador(Jugador jugador) throws TerritoryWarException {
        System.out.println(jugador.toString());
        try{
            twpm.insert(jugador);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    @Override
    public Jugador validarCredenciales(String username, String password) throws TerritoryWarException {
        Jugador ans;
        try{
            if(twpm.findById(username).validarContraseña(password)){
                ans=twpm.findById(username);
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
    
}
