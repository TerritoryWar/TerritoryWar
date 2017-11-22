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
    var navesUser = 16;
    var navesOponent = 16;

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
        //phoenix aliadas
        for (var i = 0; i < lenTablero; i++) {
            tablero[i][lenTablero - 2] = new Phoenix(i,lenTablero - 2, "aliado",lenTablero);
        };
        //vengeance aliadas
        tablero[0][lenTablero - 1] = new Vengeance(0,lenTablero - 1,"aliado",lenTablero);
        tablero[lenTablero - 1][lenTablero -1 ] = new Vengeance(lenTablero - 1,lenTablero -1,"aliado",lenTablero);
        //diminisher aliadas
        tablero[1][lenTablero - 1] = new Diminisher(1,lenTablero - 1,"aliado",lenTablero);
        tablero[lenTablero - 2][lenTablero -1 ] = new Diminisher(lenTablero - 2,lenTablero -1,"aliado",lenTablero);
        //sentinel aliada
        tablero[4][lenTablero - 1] = new Sentinel(4,lenTablero - 1,"aliado",lenTablero);
        //venoms aliadas
        tablero[2][lenTablero - 1] = new Venom(2,lenTablero - 1,"aliado",lenTablero);
        tablero[lenTablero - 3][lenTablero -1 ] = new Venom(lenTablero - 3,lenTablero -1,"aliado",lenTablero);
        tablero[3][lenTablero - 1] = new Venom(3,lenTablero - 1,"aliado",lenTablero);
    };

    var genNavesEnemigas = function () {
        //phoenix enemigas
        for (var i = 0; i < lenTablero; i++) {
            tablero[i][1] = new Phoenix(i,1, "enemigo",lenTablero);
        };
        //vengeance enemigas
        tablero[0][0] = new Vengeance(0,0,"enemigo",lenTablero);
        tablero[lenTablero -1 ][0] = new Vengeance(lenTablero -1,0,"enemigo",lenTablero);
        //diminisher enemigas
        tablero[1][0] = new Diminisher(1,0,"enemigo",lenTablero);
        tablero[lenTablero -2 ][0] = new Diminisher(lenTablero -2,0,"enemigo",lenTablero);
        //sentinel enemiga
        tablero[4][0] = new Sentinel(4,0,"enemigo",lenTablero);
        //venom enemigas
        tablero[2][0] = new Venom(2,0,"enemigo",lenTablero);
        tablero[lenTablero -3 ][0] = new Venom(lenTablero -3,0,"enemigo",lenTablero);
        tablero[3][0] = new Venom(3,0,"enemigo",lenTablero);
    };

    var isArrayInArray = function (arr, item) {
        var item_as_string = JSON.stringify(item);

        var contains = arr.some(function (ele) {
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    };
    var verificarGanador = function () {
        contarNaves();
        if (navesOponent === 0) {
            Module.publicarFinJuego(usuario.usuario);
        }
        return navesOponent;
    };
    var contarNaves = function () {
        navesUser=0;navesOponent=0;
        for (var i = 0; i < tablero.length; i++) {
            for (var j = 0; j < tablero[0].length; j++) {
                if (tablero[i][j] !== undefined && tablero[i][j] !== null && tablero[i][j].getBando() === "aliado") {
                    navesUser += 1;
                }
            }
        }
        for (var i = 0; i < tablero.length; i++) {
            for (var j = 0; j < tablero[0].length; j++) {
                if (tablero[i][j] !== undefined && tablero[i][j] !== null && tablero[i][j].getBando() === "enemigo") {
                    navesOponent += 1;
                }
            }
        }
        $("#navesUser").html("<h3 id='navesUser'> "+navesUser+" </h3>");
        $("#navesOponent").html("<h3 id='navesOponent'> "+navesOponent+" </h3>");
    };

    var limpiarObjetivos = function () {
        for (var i = 0; i < posiblesMovimientos.length; i++) {
            var x1 = posiblesMovimientos[i][0];
            var y1 = posiblesMovimientos[i][1];
            if (tablero[x1][y1] !== undefined && tablero[x1][y1] !== null && tablero[x1][y1].getBando() === "enemigo") {
                tablero[x1][y1].cambiarImagenANormal();
            } else {
                $("#" + x1 + "-" + y1).html("<img src='/images/vacio.png' height='100%' width='100%'/>");
            }
        }

    };

    var pintarPosiblesMovimientos = function () {
        for (var i = 0; i < posiblesMovimientos.length; i++) {
            var x1 = posiblesMovimientos[i][0];
            var y1 = posiblesMovimientos[i][1];
            if (tablero[x1][y1] !== undefined && tablero[x1][y1] !== null && tablero[x1][y1].getBando() === "enemigo") {
                tablero[x1][y1].cambiarImagenAPosibleObjetivo();
            } else {
                $("#" + x1 + "-" + y1).html("<img src='/images/posibleMovimiento.png' height='100%' width='100%'/>");
            }
        }
    };

    return {
        generarTablero: function (usuario1,oponente) {
            usuario = usuario1;
            naveSeleccionada = false;
            console.log("Generando tablero");
            $("#panelJuego").css('display', 'inherit');
            $("#panelJuego").html(
                    
                    //ESTADO DE JUEGO
            
                    "<div class='row' style='padding-left: inherit;'>\n\
                        <div>\n\
                            <h5 style='text-align: center;'> Cantidad de naves tuyas("+usuario.usuario+"): </h5>\n\
                            <h3 id='navesUser'> ?? </h3>\n\
                        </div>\n\
                        <div>\n\
                            <h5 style='text-align: center;'> Cantidad de naves de tu oponente("+oponente+"): </h5>\n\
                            <h3 id='navesOponent'> ?? </h3>\n\
                        </div>\n\
                        <div>\n\
                            <h5 style='text-align: center;'> Tiempo para finalizar:</h5>\n\
                            <h3 id='timeFinish'> ?? </h3>\n\
                        </div>\n\
                    </div>"
            
                    + //TABLERO
            
                    "<div class='container'>\n\
                        <div class='row'>\n\
                            <div class='col-md-3 col-md-offset-100'></div>\n\
                            <table style='table-layout:fixed;'>\n\
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
            contarNaves();

        },
        oprimiBoton: function (x, y) {
            if (naveSeleccionada && tablero[x][y] !== null && tablero[x][y] !== undefined && tablero[x][y].getBando() === "aliado") {
                limpiarObjetivos();
                naveSeleccionada = false;
            }
            if (!naveSeleccionada) { //la nave no ha sido seleccionada
                if (tablero[x][y] !== null && tablero[x][y] !== undefined && tablero[x][y].getBando() === "aliado") {
                    try {
                        posiblesMovimientos = tablero[x][y].getPosiblesMovimientos(tablero);

                        if (posiblesMovimientos.length >= 1) {
                            naveSeleccionada = true;
                            posAnterior = [x, y];
                            pintarPosiblesMovimientos();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                if (isArrayInArray(posiblesMovimientos, [x, y])) {//que si se puede mover a dicha posicion
                    limpiarObjetivos();
                    naveSeleccionada = false;
                    //publicar movimiento 
                    var movimiento = {"posAnterior": {"x": posAnterior[0], "y": posAnterior[1]}, "posSiguiente": {"x": x, "y": y}, "usuarioMueve": usuario.usuario, "partidaId": null};
                    Module.publicarMovimiento(movimiento);
                }
            }
        },
        nuevoMovimiento: function (movimiento) {
            if (movimiento.usuarioMueve !== usuario.usuario) {
                movimiento.posAnterior.y = 7 - movimiento.posAnterior.y;
                movimiento.posSiguiente.y = 7 - movimiento.posSiguiente.y;
                if (naveSeleccionada && posAnterior[0] == movimiento.posSiguiente.x && posAnterior[1] == movimiento.posSiguiente.y) {
                    naveSeleccionada = false;
                    limpiarObjetivos();
                }

            }
            tablero[movimiento.posAnterior.x][movimiento.posAnterior.y].moverNave(movimiento.posSiguiente.x, movimiento.posSiguiente.y);
            tablero[movimiento.posSiguiente.x][movimiento.posSiguiente.y] = tablero[movimiento.posAnterior.x][movimiento.posAnterior.y];
            tablero[movimiento.posAnterior.x][movimiento.posAnterior.y] = null;
            if (movimiento.usuarioMueve !== usuario.usuario && naveSeleccionada && posiblesMovimientos.length !== tablero[posAnterior[0]][posAnterior[1]].getPosiblesMovimientos(tablero).length) {
                posiblesMovimientos = tablero[posAnterior[0]][posAnterior[1]].getPosiblesMovimientos(tablero);
                if(posiblesMovimientos.length>0)pintarPosiblesMovimientos();
            }
            if (movimiento.usuarioMueve !== usuario.usuario && naveSeleccionada && isArrayInArray(posiblesMovimientos, [movimiento.posSiguiente.x, movimiento.posSiguiente.y])) {
                tablero[movimiento.posSiguiente.x][movimiento.posSiguiente.y].cambiarImagenAPosibleObjetivo();
            }
            verificarGanador();
        }
    };
})();