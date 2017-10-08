/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


apiclient = (function () {
    var usuario;
    var contrasena;
    
    
    var getPromise = function () {
        var r = $.get("territorywars/personas/" + usuario +"/"+contrasena);
        return r;

    };

    var postPromise = function () {
        var r = $.ajax({
            url: "blueprints/",
            type: 'POST',
            data: JSON.stringify(bp),
            contentType: "application/json"
        });
        return r;
    };

    
    
    return {
        getJugadorValidado:function (username,password,callback){
            usuario = username;
            contrasena = password;
            getPromise().then(callback);
        }
    };
})();