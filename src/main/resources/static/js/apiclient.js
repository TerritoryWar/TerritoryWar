/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


apiclient = (function () {
    var usuario;
    var contrasena;
    var jugador;
    
    
    var getPromise = function () {
        var r = $.get("territorywars/personas/" + usuario +"/"+contrasena);
        return r;

    };

    var postPromise = function () {
        var r = $.ajax({
            url: "territorywars/personas",
            type: 'POST',
            data: JSON.stringify(jugador),
            contentType: "application/json"
        });
        return r;
    };

    return {
        getJugadorValidado:function (username,password,callback){
            usuario = username;
            contrasena = password;
            getPromise().then(callback);
        },
        addJugador: function (jugador1,callback){
            usuario = jugador1.usuario;
            contrasena = jugador1.contrasena;
            jugador = jugador1;
            postPromise().then(getPromise()).then(callback);
        }
    };
})();