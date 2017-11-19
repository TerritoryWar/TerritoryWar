/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Sentinel {

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
        this.type = "Sentinel";
        this.tamañoTablero = lenTablero;
        this.bando = bando;
        this.puedeMoverse = true;
        if (this.bando === "aliado") {
            this.imageSrc = "images/SentinelAliado.png";
        } else {
            this.imageSrc = "images/SentinelEnemigo.png";
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
            $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelAliadoTime5.png' height='100%' width='100%'/>");
            this.setPuedeMoverse(false);
            var este = this;
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelAliadoTime4.png' height='100%' width='100%'/>");
            }, 1000);
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelAliadoTime3.png' height='100%' width='100%'/>");
            }, 2000);
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelAliadoTime2.png' height='100%' width='100%'/>");
            }, 3000);
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelAliadoTime1.png' height='100%' width='100%'/>");
            }, 4000);
            setTimeout(function () {
                este.setPuedeMoverse(true);
                este.ponerImagen();
            }, 5000);
        } else {
            $("#" + this.x + "-" + this.y).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            this.x = x;
            this.y = y;
            $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelEnemigo.png' height='100%' width='100%'/>");
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
        //miro hacia diagonal superior izquierda
        var puedoIzquierdaSuperior = true;
        var j=this.y-1;
        for (var i = this.x - 1; i > -1 && puedoIzquierdaSuperior && j>-1; i--) {
            if (tablero[i][j] == null) {
                ans.push([i,j]);

            } else if (tablero[i][j].getBando() == "enemigo") {
                puedoIzquierdaSuperior = false;
                ans.push([i, j]);
            } else {
                puedoIzquierdaSuperior = false;
            }
            j--;
        }
        //miro hacia diagonal superior derecha
        j=this.y-1;
        var puedoDerechaSuperior = true;
        for (var i = this.x + 1; i <this.tamañoTablero && puedoDerechaSuperior && j>-1; i++) {
            if (tablero[i][j] == null) {
                ans.push([i, j]);
            } else if (tablero[i][j].getBando() == "enemigo") {
                ans.push([i, j]);
                puedoDerechaSuperior = false;
            } else {
                puedoDerechaSuperior = false;
            }
            j--;
        }
        //miro hacia diagonal inferior izquierda
        var puedoIzquierdaInferior = true;
        var j=this.y+1;
        for (var i = this.x - 1; i > -1 && puedoIzquierdaInferior && j<this.tamañoTablero ; i--) {
            if (tablero[i][j] == null) {
                ans.push([i,j]);

            } else if (tablero[i][j].getBando() == "enemigo") {
                puedoIzquierdaInferior = false;
                ans.push([i, j]);
            } else {
                puedoIzquierdaInferior = false;
            }
            j++;
        }
        //miro hacia diagonal inferior derecha
        j=this.y+1;
        var puedoDerechaInferior = true;
        for (var i = this.x + 1; i<this.tamañoTablero && puedoDerechaInferior && j<this.tamañoTablero; i++) {
            if (tablero[i][j] == null) {
                ans.push([i, j]);
            } else if (tablero[i][j].getBando() == "enemigo") {
                ans.push([i, j]);
                puedoDerechaInferior = false;
            } else {
                puedoDerechaInferior = false;
            }
            j++;
        }
        
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
        $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelEnemigoKill.png' height='100%' width='100%'/>"); //por VengeanceEnemigoKill
    }

    cambiarImagenANormal() {
        $("#" + this.x + "-" + this.y).html("<img src='/images/SentinelEnemigo.png' height='100%' width='100%'/>");
    }
}



