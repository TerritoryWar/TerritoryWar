package edu.eci.arsw.territorywar.persistence.impl;

import edu.eci.arsw.territorywar.model.Jugador;
import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.MongoRepository;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author carlo
 */
//@EnableMongoRepositories
public interface TerritoryWarPersistenceMongo extends MongoRepository<Jugador, String> {
    
    public Jugador findById(String id);
}
