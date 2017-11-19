/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Vengeance {

    /**
     * Crea una nueva nave Phoenix con las posiciones dadas
     * @param {type} x, posicion en x
     * @param {type} y, posicion en y
     * @param {type} bando, el bando, puede ser "aliado" o "enemigo"
     * @param {type} lenTablero, la longitud del tablero
     * @return {Phoenix} la nueva nave
     */
    constructor(x, y, bando, lenTablero) {
        this.x = x;
        this.y = y;
        this.type = "Vengeance";
        this.tamañoTablero = lenTablero;
        this.bando = bando;
        this.puedeMoverse = true;
        if (this.bando === "aliado") {
            this.imageSrc = "images/VengeanceAliado.png";
        } else {
            this.imageSrc = "images/VengeanceEnemigo.png";
        }
        this.ponerImagen();
    }

    /**
     * cambia la imagen del boton, se usa al crear una nueva nave o cuando se mueve la nave
     */
    ponerImagen() {
        $("#" + this.x + "-" + this.y).html("<img src='" + this.imageSrc + "' height='100%' width='100%'/>");//le pone la imagen del boton
    }

    /**
     * retorna las posiciones de la nave
     */
    getPosition() {
        return {x: this.x, y: this.y};
    }

    getType() {
        return this.type;
    }
    getBando() {
        return this.bando;
    }
    getImageSrc() {
        return this.imageSrc;
    }

    setPuedeMoverse(bool) {
        this.puedeMoverse = bool;
    }

    /**
     * Cambia la posicion de la nave
     * @param {type} x, eje x
     * @param {type} y, eje y
     */
    moverNave(x, y) {
        if (this.bando === "aliado") {
            $("#" + this.x + "-" + this.y).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            this.x = x;
            this.y = y;
            $("#" + this.x + "-" + this.y).html("<img src='/images/VengeanceAliadoTime2.png' height='100%' width='100%'/>");
            this.setPuedeMoverse(false);
            var este = this;
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/VengeanceAliadoTime1.png' height='100%' width='100%'/>");
            }, 1000);
            setTimeout(function () {
                este.setPuedeMoverse(true);
                este.ponerImagen();
            }, 2000);
        } else {
            $("#" + this.x + "-" + this.y).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            this.x = x;
            this.y = y;
            $("#" + this.x + "-" + this.y).html("<img src='/images/VengeanceEnemigo.png' height='100%' width='100%'/>");
        }
    }

    /**
     * obtiene las posibles posiciones a moverse
     * @param {type} tablero, el tablero
     * @return un arreglo con los movimientos a donde puede llegar 
     */
    getPosiblesMovimientos(tablero) {
        if (!this.puedeMoverse) {

            throw "No se puede mover la nave en la posicion " + this.x + " " + this.y;
        }
        var ans = [];
        //miro hacia izquierda
        var puedoIzquierda = true;
        for (var i = this.x - 1; i > -1 && puedoIzquierda; i--) {
            if (tablero[i][this.y] == null) {
                ans.push([i, this.y]);

            } else if (tablero[i][this.y].getBando() == "enemigo") {
                puedoIzquierda = false;
                ans.push([i, this.y]);
            } else {
                puedoIzquierda = false;
            }
        }
        //miro hacia derecha
        var puedoDerecha = true;
        for (var i = this.x + 1; i < this.tamañoTablero && puedoDerecha; i++) {
            if (tablero[i][this.y] == null) {
                ans.push([i, this.y]);
            } else if (tablero[i][this.y].getBando() == "enemigo") {
                ans.push([i, this.y]);
                puedoDerecha = false;
            } else {
                puedoDerecha = false;
            }
        }
        //miro hacia arriba
        var puedoArriba = true;
        for (var i = this.y - 1; i > -1 && puedoArriba; i--) {
            if (tablero[this.x][i] == null) {
                ans.push([this.x, i]);

            } else if (tablero[this.x][i].getBando() == "enemigo") {
                puedoArriba = false;
                ans.push([this.x, i]);
            } else {
                puedoArriba = false;
            }
        }
        //miro hacia abajo
        var puedoAbajo = true;
        for (var i = this.y + 1; i < this.tamañoTablero && puedoAbajo; i++) {
            if (tablero[this.x][i] == null) {
                ans.push([this.x, i]);

            } else if (tablero[this.x][i].getBando() == "enemigo") {
                puedoAbajo = false;
                ans.push([this.x, i]);
            } else {
                puedoAbajo = false;
            }
        }

        return ans;
    }

    cambiarImagenAPosibleObjetivo() {
        $("#" + this.x + "-" + this.y).html("<img src='/images/VengeanceEnemigoKill.png' height='100%' width='100%'/>"); //por VengeanceEnemigoKill
    }

    cambiarImagenANormal() {
        $("#" + this.x + "-" + this.y).html("<img src='/images/VengeanceEnemigo.png' height='100%' width='100%'/>");
    }
}

