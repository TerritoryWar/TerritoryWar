/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Module = (function () {
    var x=0;
    return{
        getX:function (){
            return x;
        },
        setX:function (val){
            x=val;
        }
    };
})();

