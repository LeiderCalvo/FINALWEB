window.addEventListener('load', function(){
    
    //links de los botones flotantes
    document.querySelector(".carrito").addEventListener('click', function(){
        window.location.href = "/checkOut";
    });
    
    document.querySelector(".camisetas").addEventListener('click', function(){
        window.location.href = "/tienda/?producto=camisetas";
    });
    
    document.querySelector(".camisas").addEventListener('click', function(){
        window.location.href = "/tienda/?producto=camisas";
    });
    
    document.querySelector(".pantalones").addEventListener('click', function(){
        window.location.href = "/tienda/?producto=pantalones";
    });
    
    //el boton ver detalles me lleva a la descripcion de su producto
    var x= document.querySelectorAll(".productos__action__boton");
    var y= document.querySelectorAll(".productos__titulo");
    
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener('click', function (params) {
            var name = y[i].innerHTML.toString();
            console.log(name);
            window.location.href = "/descripcion/?producto="+name;
        });
    }

    var ts= document.querySelectorAll(".talla");
    ts.forEach(function(elem){
        elem.addEventListener('click', function(){
            var tit = document.querySelector('.titulo').innerText;
                window.location.href = `/tiendaTalla/?producto=${tit}&talla=${elem.innerText}`;
        });
    });

    ///Arrancar con tweenLites

    var tall = new TimelineLite();
    tall.add(TweenLite.from(document.querySelector('.filtros__talla'),2,{y: -205, opacity: 0, ease: Back.easeOut.config(1)}));
    tall.add(TweenLite.from(document.querySelector('header'),0.7,{y: -205, opacity: 0}));
    tall.add(TweenLite.from(document.querySelector('.verMas'),0.7,{y: 205, opacity: 0}));
    tall.add(TweenLite.from(document.querySelector('footer'),0.7,{y: 205, opacity: 0}));

    var tl = new TimelineLite();
    tl.delay(0.2);
    tl.add(TweenLite.from(document.querySelector('.titulo'),2,{y: -205, opacity: 0, ease: Back.easeOut.config(1)}));
    tl.add(TweenLite.fromTo(document.querySelector('.flotante'),0.3,{x: 50, opacity: 0}, {x: 0, opacity: 100}));

    var tp = new TimelineLite();
    tp.delay(1.5);
    var prods = document.querySelectorAll('.productos');

    for (let index = 0; index < prods.length; index++) {
        const element = prods[index];
        tp.add(TweenLite.fromTo(element,0.2, {opacity:0, x: function () {
            return -50;   
        }}, {opacity: 100, x:0}));
    }
});
