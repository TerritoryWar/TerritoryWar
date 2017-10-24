/*  
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Module = (function () {
    var usuario = null; //el objeto usuario
    var stompClient = null;
    var idPartida = null;
    var idOponente = null;
    
    var suscribirseParaJugar = function (partidaID) {
        conectarseAMom();
        idPartida = partidaID;
        //subscribe to /topic/TOPICXX when connections succeed
        return new Promise((resolve, reject) => {
            stompClient.connect({}, function (frame) {
                // suscripcion para esperar a alguien e iniciar partida
                stompClient.subscribe('/topic/partidas.' + partidaID, function (eventbody) {
                    var partida = JSON.parse(eventbody.body);
                    if (partida.jugador1.usuario === usuario.usuario) {
                        idOponente = partida.jugador2.usuario;
                    } else {
                        idOponente = partida.jugador1.usuario;
                    }
                    console.log("Jugador1 es: " + partida.jugador1.usuario + " y Jugador2 es: " + partida.jugador2.usuario);
                    Juego.generarTablero(usuario);

                });
                // suscripcion para que me publiquen los movimientos de mi oponente
                stompClient.subscribe('/topic/movimientos/partidas.' + idPartida, function (eventbody) {
                    var movimiento = JSON.parse(eventbody.body);
                    Juego.nuevoMovimiento(movimiento);
                });
                // suscripcion para conocer el perdedor 
                stompClient.subscribe('/topic/ganador/partidas.' + idPartida , function (eventbody) {
                    alert("Juego finalizado, ganador: " + JSON.parse(eventbody.body).jugadorGanador);
                    $("#botonJugar").css('visibility', 'visible');
                    $("#panelJuego").css('display', 'none');
                    $("#panelJuego").html(
                            "<div class='inner'><img src='images/Loading2.gif' alt='Cargando' style='width:60%;height:60%;'/></div>"
                            );
                    desconectar();
                });
                return resolve();
            });
        });
    };

    var desconectar = function () {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
    };

    var conectarseAMom = function () {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
    };


    var salirDelJuego = function () {
        apiclient.salirDelJuego(usuario);
    };

    return{
        cargarUsuario: function () {
            if (localStorage.getItem("inicioSesion")) {
                usuario = JSON.parse(localStorage.getItem('usuario'));
                conectarseAMom();
                $("#botonJugar").css('visibility', 'visible');
                $("#menuUl").replaceWith("<ul id='menuUl'>\n\
                                            <li><a href='index.html'>Home</a></li>\n\
                                            <li><a href='#' onclick='Module.logOut()'><span class='glyphicon glyphicon-log-out'></span> Logout</a></li>\n\
                                               </ul><div class='nav navbar-nav navbar-right'><label id='labelJugador' >Bienvenido " + usuario.usuario + "</label></div>");
            }
        },
        logOut: function () {
            localStorage.removeItem('usuario');
            localStorage.removeItem('inicioSesion');
            salirDelJuego();
            usuario = null;
            stompClient = null;
            location.reload(true);
            $("#botonJugar").css('visibility', 'hidden');

        },
        buscarPartida: function () {
            $("#panelJuego").css('display', 'inherit');
            $("#botonJugar").css('visibility', 'hidden');
            apiclient.getPartidasDisponibles(function (partidas) {
                if (partidas.length > 0) {
                    //significa que hay una partida disponible y me uno a esa
                    suscribirseParaJugar(partidas[0].partidaId).then(function () {
                        apiclient.unirseAPartida(usuario, partidas[0].partidaId);
                    });//Me uno primero para escuchar la conexion 
                } else {
                    //no hay partidas disponibles, entonces yo creo mi partida
                    apiclient.createPartida(usuario, function () {
                        suscribirseParaJugar(usuario.usuario);
                    });
                }
            });
        },
        exitGame: function () {
            salirDelJuego();
            localStorage.removeItem('usuario');
            localStorage.removeItem('inicioSesion');
        },
        publicarMovimiento: function (mov) {
            mov.partidaId = idPartida;
            stompClient.send("/app/movimientos/partidas." + idPartida, {}, JSON.stringify(mov));
        },
        publicarFinJuego: function (ganador) {
            stompClient.send("/app/ganador/partidas." + idPartida, {}, JSON.stringify({"jugadorGanador": ganador}));
        }
    };
})();



