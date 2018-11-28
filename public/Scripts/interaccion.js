window.addEventListener('load', function () {

    /*
        https://greensock.com/drawSVG
        https://greensock.com/ease-visualizer
    */
    var mousePos;
    var pieza = 'camisa__circulo';
    document.querySelector('html').addEventListener('mousemove', function (evt) {
        mousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
      //  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      //  console.log(message);
    });

    var colores = document.querySelectorAll('#colorsito');
    colores.forEach(element => {
        element.addEventListener('click', function () {
            var string  = element.getAttribute('data-colorsito');
           // console.log(string);
            document.querySelector(`.${pieza}`).style.fill = string;
        });
    });

    document.querySelector('.camisa__circulo').addEventListener('click', function () {
        //console.log("si entra");
        pieza = document.querySelector('.camisa__circulo').getAttribute('data-parte');
    });

    document.querySelector('.camisa__triangulo').addEventListener('click', function () {
       // console.log("si entra");
        pieza = document.querySelector('.camisa__triangulo').getAttribute('data-parte');
    });

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