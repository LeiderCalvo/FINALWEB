window.addEventListener('load', function () {

    /*
        https://greensock.com/drawSVG
        https://greensock.com/ease-visualizer
    */
    var mousePos;
    var piezas = ['camisa__cuello', 'camisa__pecho', 'camisa__espalda', 'camisa__manga1', 'camisa__manga2']
    var pieza = 'camisa__pecho';
    document.querySelector('html').addEventListener('mousemove', function (evt) {
        mousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
      //  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      //  console.log(message);
    });

    //Llamar el carrito en el localStorage
    var elemsCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(elemsCarrito == null){
        elemsCarrito = [];
    }

    //añade el listener a los colores pinta el objeto con la clase = pieza del color que trae como data el colorsito
    var colores = document.querySelectorAll('#colorsito');
    colores.forEach(element => {
        element.addEventListener('click', function () {
            var string  = element.getAttribute('data-colorsito');
           if(pieza == 'camisa__mangas'){
                document.querySelector(`.camisa__manga1`).style.fill = string;
                document.querySelector(`.camisa__manga2`).style.fill = string;    
                return;
            }
            document.querySelector(`.${pieza}`).style.fill = string;
        });
    });

    //toma los selectores de piezas de la derecha y les añade el listener para poner en la var pieza el string correspondiente a la clase 
    //del objeto a cambiar 
    var cambio = document.querySelector('.cambio');
    var selPieza = document.querySelectorAll('#selPieza');
    selPieza.forEach(element => {
        element.addEventListener('click', function () {
            if(pieza != element.getAttribute('data-pieza')){
                isPiezaFinal(element);
                pieza = element.getAttribute('data-pieza');
                movCamisa(pieza);
                element.style.borderColor = 'black';
                cambio.innerText = element.getAttribute('data-ti');
            }
        })
    });

    //se lleva la camisa y vuelve y a trae con tweenlite
    function movCamisa(p) {
        desSelecAll();
        var tl = new TimelineLite();
       if(pieza == 'camisa__mangas'){
            tl.fromTo('.camisa', 1, {x:0, ease: Power1.easeOut, opacity: 0},{x:-1900, ease: Power1.easeOut, opacity: 100}).fromTo('.camisa', 1.5, {x:1200, ease: Back.easeOut.config(1.7), opacity: 0},{x:0, ease: Back.easeOut.config(1.7), opacity: 100}).to(document.querySelector(`.camisa__manga1`),2,{stroke: 'white'}).to(document.querySelector(`.camisa__manga2`),2,{stroke: 'white'});
            return;
        }
        tl.fromTo('.camisa', 1, {x:0, ease: Power1.easeOut, opacity: 0},{x:-1900, ease: Power1.easeOut, opacity: 100}).fromTo('.camisa', 1.5, {x:1200, ease: Back.easeOut.config(1.7), opacity: 0},{x:0, ease: Back.easeOut.config(1.7), opacity: 100}).to(document.querySelector(`.${p}`),2,{stroke: 'white'});
       // document.querySelector(`.${p}`).style.stroke = 'white';
    }

    //restaura el valor del stroke a none para todos los elementos
    function desSelecAll() {
        piezas.forEach(element => {
            document.querySelector(`.${element}`).style.stroke = 'none';
        });
        selPieza.forEach(elem => {
            elem.style.borderColor = '#333333';
        });
    }

    //trae el boton si estamos en la ultima pieza
    function isPiezaFinal(p) {
        if(p.getAttribute('data-pieza') == 'camisa__espalda'){
            var tl = new TimelineLite();
            tl.fromTo('.boton__comprar',1,{left:-1000, opacity: 0},{left:70, opacity: 1});
        }else{
            var tl = new TimelineLite();
            tl.to('.boton__comprar',1,{left: -1000, opacity: 0});
        }
    }

    //Agregar el item al carrito
    document.querySelector('.boton__comprar').addEventListener('click', function () {
        addToCarrito('color', 'imagen');
        window.location.href = "/checkOut";
    });

    function addToCarrito(color, imagen){
        var p = elemsCarrito.find(function (element) {
            return element == 'PERSONALIZADO';
        });

        if(p){
            console.log("ya existe personalizado en el carrito");
            return;
        }else{
            console.log("Agregando personalizado en el carrito");
            elemsCarrito.push('PERSONALIZADO');
            localStorage.setItem('carrito', JSON.stringify(elemsCarrito));
            
            fetch(`/api/AgregarAlCarritoPersonalizado`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `color=${color}&imagen=${imagen}`,
            }).then(function(respuesta){
                return respuesta.text();
            }).catch(function(error){
                console.error(error);
            }).then(function(mensaje){
                console.log(mensaje);
            });
        }
    }

    //Inicio animado con greesock
    var tl = new TimelineLite();
    tl.add(TweenLite.from(document.querySelector('.colores'),1.3, {y:800, opacity:0,  ease: Back.easeOut.config(1)}));

    var t = new TimelineLite();
    t.add(TweenLite.from(document.querySelector('.nombre'),1.3, {x:-900, opacity:0,  ease: Back.easeOut.config(1)}));

    var z = new TimelineLite();
    z.add(TweenLite.from(document.querySelector('.camb'),1.3, {opacity:0}));

    var ps = document.querySelectorAll('#selPieza');
    var p = new TimelineLite();
    ps.forEach(element => {
        p.add(TweenLite.from(element,0.4, {y:-50, opacity:0,  ease: Back.easeOut.config(1)}));
    });

    var q = new TimelineLite();
    q.fromTo('.camisa', 1.5, {x:1200, ease: Back.easeOut.config(1.7), opacity: 0},{x:0, ease: Back.easeOut.config(1.7), opacity: 100}).to(document.querySelector(`.${p}`),2,{stroke: 'white'});

    /*
    seleccionar el eleento para cambiarle el color 
    document.querySelector('.camisa__circulo').addEventListener('click', function () {
        //console.log("si entra");
        pieza = document.querySelector('.camisa__circulo').getAttribute('data-parte');
    });

    document.querySelector('.camisa__triangulo').addEventListener('click', function () {
       // console.log("si entra");
        pieza = document.querySelector('.camisa__triangulo').getAttribute('data-parte');
    });
    */

    /* intento de mover imagenes
     var el = document.querySelector('img').getBoundingClientRect;
            console.log(el);
    var el = document.querySelector('img').getBoundingClientRect;
    console.log(el);
    this.document.querySelector('.imagenes').addEventListener('mouseover', function () {
        var pos;
        if(mousePos.x>1700){
            pos = -200;
        }else if(mousePos.x<200){
            pos = 200;
        }else{
            return;
        }
        var imgs = document.querySelectorAll('img');
        imgs.forEach(element => {
            
            TweenLite.to(element, 5, {x: function (index, target) {
                return element.getBoundingClientRect.right +pos;
            }});
        });
    });*/
});