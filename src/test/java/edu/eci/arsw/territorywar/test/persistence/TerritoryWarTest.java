/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.test.persistence;

import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.persistence.TerritoryWarPersistence;
import edu.eci.arsw.territorywar.persistence.impl.TerritoryWarPersistenceStub;
import edu.eci.arsw.territorywar.services.TerritoryWar;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import org.junit.Test;

/**
 *
 * @author carlo
 */
public class TerritoryWarTest {
    
    @Test
    public void deberiaRegistrarJugador() throws TerritoryWarException{
        TerritoryWarPersistence tw = new TerritoryWarPersistenceStub();
        Jugador jugador= new Jugador("CMS","123456", "Carlos", "carlos.sanchez-v@mail.escuelaing.edu.co");
        tw.registrarJugador(jugador);
        //no deberia dejarlo agregar dos veces
        try{
            tw.registrarJugador(jugador);
            fail();
        }catch(TerritoryWarException e){
            assertTrue(true);
        }
    }
    
    @Test
    public void deberiaValidarCredencialesCorrectamente() throws TerritoryWarException{
        TerritoryWarPersistence tw = new TerritoryWarPersistenceStub();
        Jugador jugador= new Jugador("CMS3","123456", "Carlos", "carlos.sanchez-v@mail.escuelaing.edu.co");
        tw.registrarJugador(jugador);
        try{
            Jugador ans=tw.validarCredenciales("CMS","123456");
            assertTrue(true);
        }catch(TerritoryWarException e){
            fail();
        }
               
        
    }
    
    @Test
    public void NodeberiaValidarCredenciales() throws TerritoryWarException{
        TerritoryWarPersistence tw = new TerritoryWarPersistenceStub();
        Jugador jugador= new Jugador("CMS2","123456", "Carlos", "carlos.sanchez-v@mail.escuelaing.edu.co");
        tw.registrarJugador(jugador);
        try{
            Jugador ans=tw.validarCredenciales("CMS","123457");
            fail();
        }catch(TerritoryWarException e){
            assertTrue(true);
        }
    }
}
