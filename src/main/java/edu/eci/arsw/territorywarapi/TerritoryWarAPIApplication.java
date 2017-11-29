/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywarapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.territorywar"})
@EnableMongoRepositories(basePackages = "edu.eci.arsw.territorywar.persistence.impl")
/**
 *
 * @author carlo
 */
public class TerritoryWarAPIApplication {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(TerritoryWarAPIApplication.class, args);
    }
    
}
