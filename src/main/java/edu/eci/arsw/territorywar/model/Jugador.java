/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.DigestUtils;

/**
 *
 * @author carlo
 */
@Document(collection = "usuarios")
public class Jugador {
    @Id
    private String id;
    
    
    private String contrasena;
    private String nombre;
    private String correo;

    public Jugador(String id, String contrasena, String nombre, String correo) {
        this.id = id;
        this.contrasena = contrasena;//DigestUtils.md5DigestAsHex(contrasena.getBytes()).toUpperCase();
        this.nombre = nombre;
        this.correo = correo;
    }

    public Jugador() {
    }
    
    /**
     * Mira si dos personas son las mismas
     * @param jugador el jugador a comparar
     * @return true, si poseen el mismo nombre y contraseña, false en lo contrario
     */
    public boolean equals(Jugador jugador){
        boolean ans = false;
        if(this.id.equals(jugador.id) && this.contrasena.equals(jugador.contrasena)){
            ans=true;
        }
        return ans;
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return the contrasena
     */
    public String getContrasena() {
        return contrasena;
    }

    /**
     * @param contrasena the contrasena to set
     */
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;//DigestUtils.md5DigestAsHex(contrasena.getBytes()).toUpperCase();
    }

    /**
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return the correo
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * @param correo the correo to set
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public boolean validarContraseña(String password) {
        return contrasena.equals(password);
    }

    @Override
    public String toString() {
        return "Jugador{" + "id=" + id + ", contrasena=" + contrasena + ", nombre=" + nombre + ", correo=" + correo + '}';
    }

    
    
}
    