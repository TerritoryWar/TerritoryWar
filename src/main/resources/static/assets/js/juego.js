/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Juego = (function () {
    var usuario=null; //el objeto usuario
    var stompClient = null;
    var tablero=[];
    var lenTablero=8;
    
    var genFila= function(numFila){
        var ans="";
        for (var i = 0; i < 8; i++) { 
            ans+="<td >\n\
                    <button id='"+numFila+"-"+i+"' onclick='Juego.oprimiBoton("+numFila+","+i+")' style='width:100%;height:100%'></button>\n\
                  </td>";
        }
        return ans;    
    };
    
    var genTodasFilas= function(){
        var ans="";
        for (var i = 0; i < 8; i++) {
            ans+="<tr >\n\
                        "+genFila(i)+"\n\
                        </tr>";
        }
        return ans;
    };
    
    var genNavesAliadas = function(){
        //Por el momento solo phoenix
        for (var i = lenTablero-2; i < lenTablero; i++) {
            for (var j = 0; j < lenTablero; j++) {
                tablero[i][j]=new Phoenix(i,j,"aliado");
            }
        }
    };
    
    var genNavesEnemigas = function(){
        //Por el momento solo phoenix
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < lenTablero; j++) {
                tablero[i][j]=new Phoenix(i,j,"enemigo");
            }
        }
    };
    return {
      generarTablero:function (){
          $("#panelJuego").css('display','inherit');
          $("#panelJuego").html(
                  "<div class='container'>\n\
                        <div class='row'>\n\
 -                            <div class='col-md-3 col-md-offset-100'></div>\n\
 -                            <table style='table-layout:fixed;'>\n\
                                "+genTodasFilas()+"\
                            </table>\n\
                            <div ></div>\n\
                        </div>\n\
                   </div>"
                  );
          for (var i = 0; i < lenTablero; i++) {
                tablero[i]=[];
            }
          genNavesAliadas();
          genNavesEnemigas();
      },
      oprimiBoton:function (x,y){
          alert(x+" "+y);
      }
    };
})();