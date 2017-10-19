/*
 * Clase Phoenix
 * 
 */
class Phoenix{
    
    /**
     * Crea una nueva nave Phoenix con las posiciones dadas
     * @param {type} x, posicion en x
     * @param {type} y, posicion en y
     * @param {type} bando, el bando, puede ser "aliado" o "enemigo"
     * @return {Phoenix} la nueva nave
     */
    constructor(x,y,bando){
        this.x=x;
        this.y=y;
        this.type="Phoenix";
        this.tamañoTablero=8;
        this.bando=bando;
        this.puedeMoverse=true;
        if(this.bando=="aliado"){
            this.imageSrc="images/PhoenixAliado.png";
        }
        else{
            this.imageSrc="images/PhoenixEnemigo.png";
        }
        this.ponerImagen();
    }
    
    /**
     * cambia la imagen del boton, se usa al crear una nueva nave
     */
    ponerImagen(){
        $("#"+this.x+"-"+this.y).html("<img src='"+this.imageSrc+"' height='100%' width='100%'/>");//le pone la imagen del boton
    }
    
    /**
     * retorna las posiciones de la nave
     */
    getPosition(){
        return {x:this.x,y:this.y};
    }
    
    getType(){
        return this.type;
    }
    getBando(){
        return this.bando;
    }
    getImageSrc(){
        return this.imageSrc;
    }
    
    /**
     * Cambia la posicion de la nave
     * @param {type} x, eje x
     * @param {type} y, eje y
     */
    moverNave(x,y){
        this.x=x;
        this.y=y;
        //agrega la imagen de fondo en que le falta 1 segundo para moverse
        setTimeout(function(){
            alert("Ya me puedo mover "+x+" "+y); //acá le quita la imagen de fondo
            this.puedeMoverse=true;
        }, 1000);
    }
    
    /**
     * obtiene las posibles posiciones a moverse
     * @param {type} tablero, el tablero
     * @return un arreglo con los movimientos a donde puede llegar 
     */
    getPosiblesMovimientos(tablero){
        if(!this.puedeMoverse){
            throw "No se puede mover";
        }
        var ans=[];
        if(this.x-1>=0  && (tablero[x-1][y]==null || tablero[x-1][y].getBando=="enemigo")){
            ans.push((this.x-1,this.y));
        }
        if(this.x+1<this.tamañoTablero && (tablero[x+1][y]==null || tablero[x+1][y].getBando=="enemigo")){
            ans.push((this.x+1,this.y));
        }
        if(this.y-1>=0 && (tablero[x][y-1]==null || tablero[x][y-1].getBando=="enemigo")){
            ans.push((this.x,this.y-1));
        }
        if(this.y+1<this.tamañoTablero && (tablero[x][y+1]==null || tablero[x][y+1].getBando=="enemigo")){
            ans.push((this.x,this.y+1));
        }
        return ans;
    }
    
    
    
}
