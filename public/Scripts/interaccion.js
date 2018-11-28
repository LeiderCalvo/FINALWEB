window.addEventListener('load', function () {

    /*
        https://greensock.com/drawSVG
        https://greensock.com/ease-visualizer
    */
    var mousePos;
    var piezas = ['camisa__circulo', 'camisa__triangulo', 'camisa__circulo2', 'camisa__triangulo2']
    var pieza = 'camisa__circulo';
    document.querySelector('html').addEventListener('mousemove', function (evt) {
        mousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
      //  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      //  console.log(message);
    });

    //añade el listener a los colores pinta el objeto con la clase = pieza del color que trae como data el colorsito
    var colores = document.querySelectorAll('#colorsito');
    colores.forEach(element => {
        element.addEventListener('click', function () {
            var string  = element.getAttribute('data-colorsito');
            document.querySelector(`.${pieza}`).style.fill = string;
        });
    });

    //toma los selectores de piezas de la derecha y les añade el listener para poner en la var pieza el string correspondiente a la clase 
    //del objeto a cambiar 
    var selPieza = document.querySelectorAll('#selPieza');
    selPieza.forEach(element => {
        element.addEventListener('click', function () {
            pieza = element.getAttribute('data-pieza');
            movCamisa(pieza);
        })
    });

    //se lleva la camisa y vuelve y a trae con tweenlite
    function movCamisa(p) {
        desSelecAll();
        document.querySelector(`.${p}`).style.stroke = 'white';
    }

    //restaura el valor del stroke a none para todos los elementos
    function desSelecAll() {
        piezas.forEach(element => {
            document.querySelector(`.${element}`).style.stroke = 'none';
        });
    }

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