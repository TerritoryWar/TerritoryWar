/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ModuloUsuario = (function(){
    
    
    return {
        validarCredenciales:function (){
            var usr = $("#username").val();
            var pwd = $("#password").val();
            apiclient.getJugadorValidado(usr,pwd,function (data){
                localStorage.setItem("usuario", JSON.stringify(data));
                localStorage.setItem("inicioSesion", JSON.stringify(true));
                window.location.href = "/index.html";
            });
        },
        registrarJugador:function (){
            
        }
    };
})();

