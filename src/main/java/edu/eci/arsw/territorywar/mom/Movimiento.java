/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.territorywar.mom;

import edu.eci.arsw.territorywar.model.Posicion;

/**
 *
 * @author carlo
 */
class Movimiento {
    private Posicion posAnterior;
    private Posicion posSiguiente;
    private String usuarioMueve;
    private String partidaId;

    @Override
    public String toString() {
        return "Movimiento{" + "posAnterior=" + posAnterior + ", posSiguiente=" + posSiguiente + ", usuarioMueve=" + usuarioMueve + ", partidaId=" + partidaId + '}';
    }

    /**
     * @return the posAnterior
     */
    public Posicion getPosAnterior() {
        return posAnterior;
    }

    /**
     * @param posAnterior the posAnterior to set
     */
    public void setPosAnterior(Posicion posAnterior) {
        this.posAnterior = posAnterior;
    }

    /**
     * @return the posSiguiente
     */
    public Posicion getPosSiguiente() {
        return posSiguiente;
    }

    /**
     * @param posSiguiente the posSiguiente to set
     */
    public void setPosSiguiente(Posicion posSiguiente) {
        this.posSiguiente = posSiguiente;
    }

    /**
     * @return the partidaId
     */
    public String getPartidaId() {
        return partidaId;
    }

    /**
     * @param partidaId the partidaId to set
     */
    public void setPartidaId(String partidaId) {
        this.partidaId = partidaId;
    }

    /**
     * @return the usuarioMueve
     */
    public String getUsuarioMueve() {
        return usuarioMueve;
    }

    /**
     * @param usuarioMueve the usuarioMueve to set
     */
    public void setUsuarioMueve(String usuarioMueve) {
        this.usuarioMueve = usuarioMueve;
    }

 
    
}
