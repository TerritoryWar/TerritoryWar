/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Venom {

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
        this.type = "Venom";
        this.tamañoTablero = lenTablero;
        this.bando = bando;
        this.puedeMoverse = true;
        if (this.bando === "aliado") {
            this.imageSrc = "images/VenomAliado.png";
        } else {
            this.imageSrc = "images/VenomEnemigo.png";
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
            $("#" + this.x + "-" + this.y).html("<img src='/images/VenomAliadoTime3.png' height='100%' width='100%'/>");
            this.setPuedeMoverse(false);
            var este = this;
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/VenomAliadoTime2.png' height='100%' width='100%'/>");
            }, 1000);
            setTimeout(function () {
                $("#" + this.x + "-" + this.y).html("<img src='/images/VenomAliadoTime1.png' height='100%' width='100%'/>");
            }, 2000);
            setTimeout(function () {
                este.setPuedeMoverse(true);
                este.ponerImagen();
            }, 3000);
        } else {
            $("#" + this.x + "-" + this.y).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            this.x = x;
            this.y = y;
            $("#" + this.x + "-" + this.y).html("<img src='/images/VenomEnemigo.png' height='100%' width='100%'/>");
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
        for (var i = this.x - 1;i>this.x-3 && i > -1 && puedoIzquierdaSuperior && j>-1; i--) {
            if (tablero[i][j] == null) {
                ans.push([i,j]);

            } else if (tablero[i][j].getBando() == "enemigo") {
                puedoIzquierdaSuperior = false;
                ans.push([i, j]);
            } 
            j--;
        }
        //miro hacia diagonal superior derecha
        j=this.y-1;
        var puedoDerechaSuperior = true;
        for (var i = this.x + 1;i<this.x+3 && i <this.tamañoTablero && puedoDerechaSuperior && j>-1; i++) {
            if (tablero[i][j] == null) {
                ans.push([i, j]);
            } else if (tablero[i][j].getBando() == "enemigo") {
                ans.push([i, j]);
                puedoDerechaSuperior = false;
            } 
            j--;
        }
        //miro hacia diagonal inferior izquierda
        var puedoIzquierdaInferior = true;
        var j=this.y+1;
        for (var i = this.x - 1;i>this.x-3 && i > -1 && puedoIzquierdaInferior && j<this.tamañoTablero ; i--) {
            if (tablero[i][j] == null) {
                ans.push([i,j]);

            } else if (tablero[i][j].getBando() == "enemigo") {
                puedoIzquierdaInferior = false;
                ans.push([i, j]);
            } 
            j++;
        }
        //miro hacia diagonal inferior derecha
        j=this.y+1;
        var puedoDerechaInferior = true;
        for (var i = this.x + 1;i<this.x+3 && i<this.tamañoTablero && puedoDerechaInferior && j<this.tamañoTablero; i++) {
            if (tablero[i][j] == null) {
                ans.push([i, j]);
            } else if (tablero[i][j].getBando() == "enemigo") {
                ans.push([i, j]);
                puedoDerechaInferior = false;
            } 
            j++;
        }
        
        //miro hacia izquierda
        var puedoIzquierda = true;
        for (var i = this.x - 1;i>this.x-3 && i > -1 && puedoIzquierda; i--) {
            if (tablero[i][this.y] == null) {
                ans.push([i, this.y]);

            } else if (tablero[i][this.y].getBando() == "enemigo") {
                puedoIzquierda = false;
                ans.push([i, this.y]);
            }
        }
        //miro hacia derecha
        var puedoDerecha = true;
        for (var i = this.x + 1;i<this.x+3 && i < this.tamañoTablero && puedoDerecha; i++) {
            if (tablero[i][this.y] == null) {
                ans.push([i, this.y]);
            } else if (tablero[i][this.y].getBando() == "enemigo") {
                ans.push([i, this.y]);
                puedoDerecha = false;
            } 
        }
        //miro hacia arriba
        var puedoArriba = true;
        for (var i = this.y - 1;i>this.y-3 && i > -1 && puedoArriba; i--) {
            if (tablero[this.x][i] == null) {
                ans.push([this.x, i]);

            } else if (tablero[this.x][i].getBando() == "enemigo") {
                puedoArriba = false;
                ans.push([this.x, i]);
            } 
        }
        //miro hacia abajo
        var puedoAbajo = true;
        for (var i = this.y + 1;i<this.y+3 && i < this.tamañoTablero && puedoAbajo; i++) {
            if (tablero[this.x][i] == null) {
                ans.push([this.x, i]);

            } else if (tablero[this.x][i].getBando() == "enemigo") {
                puedoAbajo = false;
                ans.push([this.x, i]);
            }
        }
        
        
        return ans;
    }

    cambiarImagenAPosibleObjetivo() {
        $("#" + this.x + "-" + this.y).html("<img src='/images/VenomEnemigoKill.png' height='100%' width='100%'/>");
    }

    cambiarImagenANormal() {
        $("#" + this.x + "-" + this.y).html("<img src='/images/VenomEnemigo.png' height='100%' width='100%'/>");
    }
}

