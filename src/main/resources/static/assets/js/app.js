/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Module = (function () {
    var usuario=null;
    
    return{
        cargarUsuario:function (){
            if(localStorage.getItem("inicioSesion")){
                usuario=JSON.parse(localStorage.getItem('usuario'));
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
        }
        
    };
})();

