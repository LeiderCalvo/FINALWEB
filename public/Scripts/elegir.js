window.addEventListener('load', function () {
    var man = document.querySelector('.elegir__men');
    var woman = document.querySelector('.elegir__woman');

    man.addEventListener('click', function () {
        window.location.href = '/inicio';
    });

    woman.addEventListener('click', function () {
        alert('Esta página no está disponible por el momento, porfavor ingrese a la seccion de hombres');
    });

    
    var mousePos;
    document.querySelector('html').addEventListener('mousemove', function (evt) {
        mousePos = {
            x: evt.clientX,
            y: evt.clientY
        };

        if(mousePos.x>window.innerWidth/2 ){
            var tl = new TimelineLite();
            TweenLite.to(woman,1,{opacity:1, width: (window.innerWidth/2)+100, ease: Back.easeOut.config(1)});
            TweenLite.to(man,1,{opacity:0.3, width: (window.innerWidth/2)-100, ease: Back.easeOut.config(1)});
        }else{
            var tl = new TimelineLite();
            TweenLite.to(man,1,{opacity:1, width: (window.innerWidth/2)+100, ease: Back.easeOut.config(1)});
            TweenLite.to(woman,1,{opacity:0.3, width: (window.innerWidth/2)-100, ease: Back.easeOut.config(1)});
        }
    });
});