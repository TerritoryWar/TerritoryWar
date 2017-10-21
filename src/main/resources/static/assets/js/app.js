/*  
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Module = (function () {
    var usuario=null; //el objeto usuario
    var stompClient = null;
    
    
    var unirseOCrearPartida = function (partidaID) {
        conectarseAMom();
        //subscribe to /topic/TOPICXX when connections succeed
        return new Promise((resolve, reject) => {
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe('/topic/partidas.' + partidaID, function (eventbody) {
                        var partida = JSON.parse(eventbody.body);
                        console.log("Jugador1 es: "+partida.jugador1.usuario+ " y Jugador2 es: "+partida.jugador2.usuario);
                        
                    });
                    return resolve();
                });});    
    };
    
    var desconectar = function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
        };
    
    var conectarseAMom = function (){
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
    };
    
    
    var salirDelJuego = function (){
        apiclient.salirDelJuego(usuario);
    };
    
    
    
    return{
        cargarUsuario:function (){
            if(localStorage.getItem("inicioSesion")){
                usuario=JSON.parse(localStorage.getItem('usuario'));
                conectarseAMom();
                $("#botonJugar").css('visibility','visible');
                $("#menuUl").replaceWith("<ul id='menuUl'>\n\
                                            <li><a href='index.html'>Home</a></li>\n\
                                            <li><a href='#' onclick='Module.logOut()'><span class='glyphicon glyphicon-log-out'></span> Logout</a></li>\n\
                                               </ul><div class='nav navbar-nav navbar-right'><label id='labelJugador' >Bienvenido "+usuario.usuario+ "</label></div>");
                
            }
        },
        logOut: function (){
            localStorage.removeItem('usuario');
            localStorage.removeItem('inicioSesion');
            salirDelJuego();
            usuario=null;
            stompClient=null;
            location.reload(true);
            $("#botonJugar").css('visibility','hidden');
            
        },
        buscarPartida:function (){
            $("#panelJuego").css('display','inherit');
            apiclient.getPartidasDisponibles(function (partidas){
                if(partidas.length>0){
                    //significa que hay una partida disponible y me uno a esa
                    unirseOCrearPartida(partidas[0].partidaId).then(function(){
                        apiclient.unirseAPartida(usuario,partidas[0].partidaId);
                    });//Me uno primero para escuchar la conexion
                    
                    
                    
                }
                else{
                    //no hay partidas disponibles, entonces yo creo mi partida
                    apiclient.createPartida(usuario,function (){
                        unirseOCrearPartida(usuario.usuario);
                    });
                }
            });
        },
        exitGame:function (){
            salirDelJuego();
            localStorage.removeItem('usuario');
            localStorage.removeItem('inicioSesion');
        }
        
    };
})();



