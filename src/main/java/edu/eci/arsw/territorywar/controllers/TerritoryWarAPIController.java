/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.controllers;


import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.services.TerritoryWar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author carlo
 */
@RestController
@RequestMapping(value = "/territorywars")
public class TerritoryWarAPIController {
    @Autowired TerritoryWar tw=null;
    
    @RequestMapping(path = "/personas",method = RequestMethod.POST)
    public ResponseEntity<?> newJugador(@RequestBody Jugador p){
        try{
            tw.registrarJugador(p);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(TerritoryWarException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.FORBIDDEN);
        }
        
    }
    
    @RequestMapping(path = "/personas/{username}/{password}", method = RequestMethod.GET)
    public ResponseEntity<?> validarJugador(@PathVariable String username,@PathVariable String password){
        try {
            return new ResponseEntity<>(tw.validarCredenciales(username, password),HttpStatus.ACCEPTED);
        } catch (TerritoryWarException ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
