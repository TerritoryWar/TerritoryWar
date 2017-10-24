/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Juego = (function () {
    var usuario = null; //el objeto usuario
    var tablero = [];
    var lenTablero = 8;
    var naveSeleccionada = false; //booleano para saber si el jugador tiene una nave seleccionada
    var posiblesMovimientos = [];
    var posAnterior;

    var genFila = function (numFila) {
        var ans = "";
        for (var i = 0; i < 8; i++) {
            ans += "<td style='padding:0 0 0 0 !important;'>\n\
                    <button id='" + i + "-" + numFila + "' onclick='Juego.oprimiBoton(" + i + "," + numFila + ")' style='width:100%;'>\n\
                        <img src='/images/vacio.png' height='100%' width='100%'/>\n\
                    </button>\n\
                  </td>";
        }
        return ans;
    };

    var genTodasFilas = function () {
        var ans = "";
        for (var i = 0; i < 8; i++) {
            ans += "<tr >\n\
                        " + genFila(i) + "\n\
                        </tr>";
        }
        return ans;
    };

    var genNavesAliadas = function () {
        //Por el momento solo phoenix
        for (var i = lenTablero - 2; i < lenTablero; i++) {
            for (var j = 0; j < lenTablero; j++) {
                tablero[j][i] = new Phoenix(j, i, "aliado");
            }
        }
    };

    var genNavesEnemigas = function () {
        //Por el momento solo phoenix
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < lenTablero; j++) {
                tablero[j][i] = new Phoenix(j, i, "enemigo");
            }
        }
    };

    var isArrayInArray = function (arr, item) {
        var item_as_string = JSON.stringify(item);

        var contains = arr.some(function (ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    };
    var verificarGanador = function () {
            var naves = contarNaves();
            if (naves===0){
                Module.publicarFinJuego(usuario.usuario);
            }
            return naves;
    };
    var contarNaves = function () {
        var naves = 0;
        for (var i = 0; i < tablero.length; i++) {
            for (var j = 0; j < tablero[0].length; j++) {
                if (tablero[i][j] !== undefined && tablero[i][j] !== null && tablero[i][j].getBando() === "enemigo") {
                    naves += 1;
                }
            }
        }
        return naves;
    };
    
    return {
        generarTablero: function (usuario1) {
            usuario=usuario1;
            console.log("Generando tablero");
            $("#panelJuego").css('display', 'inherit');
            $("#panelJuego").html(
                    "<div class='container'>\n\
                        <div class='row'>\n\
 -                            <div class='col-md-3 col-md-offset-100'></div>\n\
 -                            <table style='table-layout:fixed;'>\n\
                                " + genTodasFilas() + "\
                            </table>\n\
                            <div ></div>\n\
                        </div>\n\
                   </div>"
                    );
            for (var i = 0; i < lenTablero; i++) {
                tablero[i] = [];
            }
            genNavesAliadas();
            genNavesEnemigas();

        },
        oprimiBoton: function (x, y) {
            if (!naveSeleccionada) { //la nave no ha sido seleccionada
                if (tablero[x][y] !== null && tablero[x][y] !== undefined && tablero[x][y].getBando() === "aliado") {
                    try {
                        posiblesMovimientos = tablero[x][y].getPosiblesMovimientos(tablero);

                        if (posiblesMovimientos.length >= 1) {
                            naveSeleccionada = true;
                            posAnterior = [x, y];
                            for (var i = 0; i < posiblesMovimientos.length; i++) {
                                var x1 = posiblesMovimientos[i][0];
                                var y1 = posiblesMovimientos[i][1];
                                if (tablero[x1][y1] !== undefined && tablero[x1][y1] !== null && tablero[x1][y1].getBando() === "enemigo") {
                                    tablero[x1][y1].cambiarImagenAPosibleObjetivo();
                                } else {
                                    $("#" + x1 + "-" + y1).html("<img src='/images/posibleMovimiento.png' height='100%' width='100%'/>");
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                if (isArrayInArray(posiblesMovimientos, [x, y])) {//que si se puede mover a dicha posicion
                    for (var i = 0; i < posiblesMovimientos.length; i++) {
                        var x1 = posiblesMovimientos[i][0];
                        var y1 = posiblesMovimientos[i][1];
                        if (tablero[x1][y1] !== undefined && tablero[x1][y1] !== null && tablero[x1][y1].getBando() === "enemigo") {
                            tablero[x1][y1].cambiarImagenANormal();
                        } else {
                            $("#" + x1 + "-" + y1).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
                        }
                    }
                    naveSeleccionada = false;
                    //publicar movimiento 
                    var movimiento = {"posAnterior":{"x":posAnterior[0],"y":posAnterior[1]},"posSiguiente":{"x":x,"y":y},"usuarioMueve":usuario.usuario,"partidaId":null};
                    Module.publicarMovimiento(movimiento);
                }
            }
        },
        nuevoMovimiento: function (movimiento) {
            if(movimiento.usuarioMueve !== usuario.usuario){
                movimiento.posAnterior.y = 7-movimiento.posAnterior.y;
                movimiento.posSiguiente.y = 7-movimiento.posSiguiente.y;
            }
            tablero[movimiento.posAnterior.x][movimiento.posAnterior.y].moverNave(movimiento.posSiguiente.x, movimiento.posSiguiente.y);
            tablero[movimiento.posSiguiente.x][movimiento.posSiguiente.y] = tablero[movimiento.posAnterior.x][movimiento.posAnterior.y];
            tablero[movimiento.posAnterior.x][movimiento.posAnterior.y] = null;
            verificarGanador();
        }
    };
})();