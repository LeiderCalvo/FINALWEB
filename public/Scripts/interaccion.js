window.addEventListener('load', function () {

    /*
        https://greensock.com/drawSVG
        https://greensock.com/ease-visualizer
    */
    var mousePos;
    document.querySelector('html').addEventListener('mousemove', function (evt) {
        mousePos = {
            x: evt.clientX,
            y: evt.clientY
        };
      //  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      //  console.log(message);
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