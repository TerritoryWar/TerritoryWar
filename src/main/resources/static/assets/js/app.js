/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Module = (function () {
    var usuario=null;
    var stompClient = null;
    
    var UnirseOCrearPartida = function (id) {
        conectarseAMom();
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/partidas.' + id, function (eventbody) {
                var partida = JSON.parse(eventbody.body);
                alert("Jugador1 es: "+partida.jugador1.usuario+ " y Jugador2 es: "+partida.jugador2.usuario);
            });
        });
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
            location.reload(true);
            $("#botonJugar").css('visibility','hidden');
            
        },
        buscarPartida:function (){
            $("#panelJuego").css('display','inherit');
            apiclient.getPartidasDisponibles(function (partidas){
                if(partidas.length>0){
                    //significa que hay una partida disponible y me uno a esa
                    
                    stompClient.send("/app/joinGame." + partidas[0].partidaId, {}, JSON.stringify(usuario));
                    UnirseOCrearPartida(partidas[0].partidaId);
                    
                }
                else{
                    //no hay partidas disponibles, entonces yo creo mi partida
                }
            });
        }
        
    };
})();

