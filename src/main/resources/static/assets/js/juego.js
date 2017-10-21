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
    var naveSeleccionada=false; //booleano para saber si el jugador tiene una nave seleccionada
    var posiblesMovimientos=[];
    var posAnterior;
    
    var genFila= function(numFila){
        var ans="";
        for (var i = 0; i < 8; i++) { 
            ans+="<td style='padding:0 0 0 0 !important;'>\n\
                    <button id='"+i+"-"+numFila+"' onclick='Juego.oprimiBoton("+i+","+numFila+")' style='width:100%;'>\n\
                        <img src='/images/vacio.png' height='100%' width='100%'/>\n\
                    </button>\n\
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
                tablero[j][i]=new Phoenix(j,i,"aliado");
            }
        }
    };
    
    var genNavesEnemigas = function(){
        //Por el momento solo phoenix
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < lenTablero; j++) {
                tablero[j][i]=new Phoenix(j,i,"enemigo");
            }
        }
    };
    
    
    var isArrayInArray = function (arr, item){
        var item_as_string = JSON.stringify(item);

        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
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
          if(!naveSeleccionada){ //la nave no ha sido seleccionada
              if(tablero[x][y]!=null && tablero[x][y].getBando()=="aliado"){
                  try{ 
                    posiblesMovimientos=tablero[x][y].getPosiblesMovimientos(tablero);
                    naveSeleccionada=true;
                    posAnterior=[x,y];
                      for (var i = 0; i < posiblesMovimientos.length; i++) {
                          $("#"+posiblesMovimientos[i][0]+"-"+posiblesMovimientos[i][1]).html("<img src='/images/posibleMovimiento.png' height='100%' width='100%'/>"); //falta mirar si la pos tiene una nave enemiga
                      }
                  }catch(e){
                      console.log(e);
                  }

              }
          }
          else{
              if(isArrayInArray(posiblesMovimientos,[x,y])){//que si se puede mover a dicha posicion
                  for (var i = 0; i < posiblesMovimientos.length; i++) {
                          $("#"+posiblesMovimientos[i][0]+"-"+posiblesMovimientos[i][1]).html("<img src='/images/vacio.png' height='100%' width='100%'/>");//falta mirar si la pos tiene una nave enemiga
                      }
                  tablero[posAnterior[0]][posAnterior[1]].moverNave(x,y);
                  tablero[x][y]=tablero[posAnterior[0]][posAnterior[1]];
                  tablero[posAnterior[0]][posAnterior[1]]=null;
                  naveSeleccionada=false;
              }
          }
          
      }
    };
})();