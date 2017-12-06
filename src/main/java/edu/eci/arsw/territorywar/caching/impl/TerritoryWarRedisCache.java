/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.caching.impl;

import edu.eci.arsw.territorywar.caching.TerritoryWarCache;
import edu.eci.arsw.territorywar.exceptions.TerritoryWarException;
import edu.eci.arsw.territorywar.model.Jugador;
import edu.eci.arsw.territorywar.model.Partida;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.stereotype.Service;

/**
 *
 * @author carlo
 */
//@Service
public class TerritoryWarRedisCache implements TerritoryWarCache{
    @Autowired
    private StringRedisTemplate template;
    
//    RedisScript<String> script;

    @Override
    public Set<Partida> getPartidasDisponibles() {
        Set<Partida> ans = new HashSet<>();
        Set<String>  partidas = template.opsForSet().members("partidas");
        System.out.println(partidas.size()+ " CANTIDAD DE PARTIDAS");
        for (String partida : partidas) {
            System.out.println(partida + " PARTIDA");
            System.out.println(template.opsForHash().get(partida, "jugador2"));
            if(template.opsForHash().get(partida, "jugador2")==null){
                Partida par = new Partida((String) partida,new Jugador((String)template.opsForHash().get("partida:" + partida, "jugador1"), null,null,null));
                ans.add(par);
                template.opsForSet().add(("partidas"),par.getPartidaId());
            }
        }
        return ans;
    }

    @Override
    public void crearPartida(Jugador jugador) {
        System.out.println("CREAR PARTIDA");
        template.opsForHash().put("partida:" + jugador.getId(), "jugador1",jugador.getId());
        template.opsForSet().add(("partidas"),"partida:"+jugador.getId());
    }

    @Override
    public void unirAPartida(String id, Jugador jugador2) throws TerritoryWarException {
        template.opsForHash().put("partida:" + id, "jugador2",jugador2.getId());
    }

    @Override
    public Partida getPartida(String id) {
        Partida ans;
        ans =  new Partida(id , new Jugador((String)template.opsForHash().get("partida:" + id, "jugador1"), null, null, null));
        if(!template.opsForHash().get("partida:" + id, "jugador2").equals("null")){
            try {
                ans.setJugador2(new Jugador((String)template.opsForHash().get("partida:" + id, "jugador2"),null,null,null));
            } catch (TerritoryWarException ex) {
                ex.getMessage();
            }
        }
        return ans;
    }

    @Override
    public void deletePartida(String idPartida) {
        System.out.println("ELIMINAR PARTIDA");
        template.opsForHash().delete("partida:" + idPartida, "jugador1");
        template.opsForHash().delete("partida:" + idPartida, "jugador2");
        
    }
    
}
