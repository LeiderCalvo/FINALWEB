window.addEventListener('load', function(){

    
    //------------------------- Rotacion del banner
    
    var myVar = setInterval(ChangeImgTimer, 5000);
    var cont = 0;
    
    var imgs = ['url(/imgs/previas/banner_1.png)', 'url(/imgs/previas/banner_2.png)', 'url(/imgs/previas/banner_3.png)']; 
    
    function ChangeImgTimer() {
        document.querySelector('.promociones').style.WebkitTransition = "all 2s";
        document.querySelector('.promociones').style.Transition = "all 2s";
        document.querySelector('.promociones').style.backgroundImage
         = imgs[cont];
    
         cont++;
         if(cont==imgs.length)cont=0;
    }
    
    /*function agregarText(x) {
        var s = x.innerHtml;
        document.querySelector(x).innerHtml;
        console.log(s);
    }*/
    
    
    //------------------------- INTERACCION 3
    var caracts = [{esp:`<div class="esp__fondo">
    <div class="esp__boton">COMPRAR</div>
    </div>
    
    <p class="esp__parf">Co-creamos<br>contigo las mejores ideas,<br>vestirte como
    deseas</p>
    
    <div class="caract__especifica__text" id="Cuno__txt" style="margin-top: 51.2%;">ELIGE<br>TU PROPIO<br>ESTILO</div>
    `, original: `<div class="caract__especifica__text" id="Cuno__txt" style="margin-top: 90%;">ELIGE<br>TU PROPIO<br>ESTILO</div>
    `}, {esp:`<div class="esp__fondo">
    <div class="esp__boton">COMPRAR</div>
    </div>
    
    <p class="esp__parf">Cuenta con<br>la mejor asesoria para elejir<br>como deseas lucir</p>
    
    <div class="caract__especifica__text" id="Cdos__txt" style="margin-top: 51.2%;">TELA<br>DE LA MEJOR<br>CALIDAD</div>
    `, original: `<div class="caract__especifica__text" id="Cdos__txt" style="margin-top: 90%;">TELA<br>DE LA MEJOR<br>CALIDAD</div>`}, {esp:`<div style="padding: 293px 150px 30px 50px;" class="caract__especifica__text">TODO<br>LIMITE ESTA EN<br>TU MENTE</div>
                        
    <p class="esp__parf">Gran variedad<br>de opciones a la hora de buscar<br>ese estilo que va contigo</p>
    
    <div class="esp__fondo">
        <div class="esp__boton">COMPRAR</div>
    </div>
    `, original: `<div style="padding: 478px 150px 30px 50px;" class="caract__especifica__text">TODO<br>LIMITE ESTA EN<br>TU MENTE</div>`}];
    
    //_____primero
    var yaUno = 0;
    
    document.getElementById("Cuno").addEventListener("mouseover", mouseOver);
    document.getElementById("Cuno").addEventListener("mouseout", mouseOut);
    
    function mouseOver() {
        if(yaUno==0){
            document.getElementById("Cuno").innerHTML = caracts[0].esp;
            yaUno=1;
        }
        //console.log("njkn");
    }
    
    function mouseOut() {
        document.getElementById("Cuno").innerHTML = caracts[0].original;
        yaUno=0;
        //console.log(yaUno);
    }
    
    //_____segundo
    var yaDos = 0;
    
    document.getElementById("Cdos").addEventListener("mouseover", mouseOver2);
    document.getElementById("Cdos").addEventListener("mouseout", mouseOut2);
    
    function mouseOver2() {
        if(yaDos==0){
            document.getElementById("Cdos").innerHTML = caracts[1].esp;
            yaDos=1;
        }
    }
    
    function mouseOut2() {
        document.getElementById("Cdos").innerHTML = caracts[1].original;
        yaDos=0;
    }
    
    //_____tercero
    var yaTres = 0;
    
    document.getElementById("Ctres").addEventListener("mouseover", mouseOver3);
    document.getElementById("Ctres").addEventListener("mouseout", mouseOut3);
    
    function mouseOver3() {
        if(yaTres==0){
            document.getElementById("Ctres").innerHTML = caracts[2].esp;
            yaTres=1;
        }
    }
    
    function mouseOut3() {
        document.getElementById("Ctres").innerHTML = caracts[2].original;
        yaTres=0;
    } 
});