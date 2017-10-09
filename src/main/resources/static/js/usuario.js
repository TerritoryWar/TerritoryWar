/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ModuloUsuario = (function(){
    
    /**
     * Funcion que captura las variables pasados por GET
     * http://www.lawebdelprogramador.com/pagina.html?id=10&pos=3
     * Devuelve un array de clave=>valor
     */
    var getParametros = function()
    {
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if(loc.indexOf('?')>0)
        {
            // cogemos la parte de la url que hay despues del interrogante
            var getString = loc.split('?')[1];
            // obtenemos un array con cada clave=valor
            var GET = getString.split('&');
            var get = {};
 
            // recorremos todo el array de valores
            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }
    
    
    return {
        validarCredenciales:function (){
            var usr = $("#username").val();
            var pwd = $("#password").val();
                apiclient.getJugadorValidado(usr,pwd,function (data){
                    localStorage.setItem("usuario", JSON.stringify(data));
                    localStorage.setItem("inicioSesion", JSON.stringify(true));
                    window.location.href = "/index.html";
                },function(){
                    window.location.href = "/signIn.html?error=1";
                });
        },
        registrarJugador:function (){
            var usuario = $("#username").val();
            var jugadorJSON = {"usuario": usuario,"contrasena":$("#password").val(),"nombre":$("#name").val(),"correo":$("#email").val()};
                apiclient.addJugador(jugadorJSON, function(data){
                localStorage.setItem("usuario", JSON.stringify(data));
                localStorage.setItem("inicioSesion", JSON.stringify(true));
                window.location.href = "/index.html";
            });
        },
        revisarMalasCredenciales:function(){
            var loc = document.location.href;
            // si existe el interrogante
            if(loc.indexOf('?')>0)
            {
                var error = getParametros()["error"];
                if(error==1){
                    $("#divDatos").before('<div class="alert alert-danger"><strong>Datos de usuario incorrectos</strong></div>');
                }
            }
        } 
    };
})();

