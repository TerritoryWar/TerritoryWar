/*
 * Clase Phoenix
 * 
 */
class Phoenix {

    /**
     * Crea una nueva nave Phoenix con las posiciones dadas
     * @param {type} x, posicion en x
     * @param {type} y, posicion en y
     * @param {type} bando, el bando, puede ser "aliado" o "enemigo"
     * @return {Phoenix} la nueva nave
     */
    constructor(x, y, bando) {
        this.x = x;
        this.y = y;
        this.type = "Phoenix";
        this.tamañoTablero = 8;
        this.bando = bando;
        this.puedeMoverse = true;
        if (this.bando == "aliado") {
            this.imageSrc = "images/PhoenixAliado.png";
        } else {
            this.imageSrc = "images/PhoenixEnemigo.png";
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
            $("#" + this.x + "-" + this.y).html("<img src='/images/PhoenixAliadoTime1.png' height='100%' width='100%'/>");
            this.setPuedeMoverse(false);
            var este = this;
            setTimeout(function () {
                este.setPuedeMoverse(true);
                este.ponerImagen();
            }, 1000);
        } else {
            $("#" + this.x + "-" + this.y).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            this.x = x;
            this.y = y;
            $("#" + this.x + "-" + this.y).html("<img src='/images/PhoenixEnemigo.png' height='100%' width='100%'/>");
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
        if (this.x - 1 >= 0 && (tablero[this.x - 1][this.y] == null || tablero[this.x - 1][this.y].getBando() == "enemigo")) {
            ans.push([this.x - 1, this.y]);
        }
        if (this.x + 1 < this.tamañoTablero && (tablero[this.x + 1][this.y] == null || tablero[this.x + 1][this.y].getBando() == "enemigo")) {
            ans.push([this.x + 1, this.y]);
        }
        if (this.y - 1 >= 0 && (tablero[this.x][this.y - 1] == null || tablero[this.x][this.y - 1].getBando() == "enemigo")) {
            ans.push([this.x, this.y - 1]);
        }
        if (this.y + 1 < this.tamañoTablero && (tablero[this.x][this.y + 1] == null || tablero[this.x][this.y + 1].getBando() == "enemigo")) {
            ans.push([this.x, this.y + 1]);
        }

        return ans;
    }

}
