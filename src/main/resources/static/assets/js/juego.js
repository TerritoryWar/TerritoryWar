/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Juego = (function () {
    var usuario=null; //el objeto usuario
    var stompClient = null;
    
    var genFila= function(numFila){
        var ans="";
        for (var i = 0; i < 8; i++) { 
            ans+="<div class='col-md-1'>\n\
                    <button id='"+numFila+"-"+i+"' onclick='Juego.oprimiBoton("+numFila+","+i+")'></button>\n\
                  </div>";
        }
        return ans;    
    };
    
    var genTodasFilas= function(){
        var ans="";
        for (var i = 0; i < 8; i++) {
            ans+="<div class='row'>\n\
                        "+genFila(i)+"\n\
                        </div>";
            console.log(ans);
        }
        return ans;
    };
    
    return {
      generarTablero:function (){
          $("#panelJuego").css('display','inherit');
          $("#panelJuego").html(
                  "<div class='container'>\n\
                        <div class='row'>\n\
                            <div class='col-md-3 col-md-offset-100'></div>\n\
                            <div class='col-md-6'>\n\
                                "+genTodasFilas()+"\
                            </div>\n\
                            <div class='col-md-3 col-md-offset-100'></div>\n\
                        </div>\n\
                   </div>"
                  );
      },
      oprimiBoton:function (x,y){
          alert(x+" "+y);
      }
    };
})();