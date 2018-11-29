window.addEventListener('load', function(){
    document.querySelector('.btn__volver').addEventListener('click', function(){
        window.location.href = "/tiendageneral";
    });

    if(document.querySelector('.camisetas') != null && document.querySelector('.camisetas') != undefined){
        document.querySelector('.camisetas').addEventListener('click', function(){
            window.location.href = "/interaccion";
        });
    }

    var elemsCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(elemsCarrito == null){
        elemsCarrito = [];
    }

    var agregar = document.querySelector('.btn__AgregarYvolver');
    agregar.addEventListener('click', function(){
        addToCarrito(agregar.getAttribute('data-Titulo'));
    });

    var comprar = document.querySelector('.btn__AgregarYcomprar');
    comprar.addEventListener('click', function(){
        addToCarrito(comprar.getAttribute('data-Titulo'));
        window.location.href = "/checkOut";
    });
    
    function addToCarrito(atributo){
        var p = elemsCarrito.find(function (element) {
            return element == atributo;
        });

        if(p){
            return;
        }else{
            elemsCarrito.push(atributo);
            localStorage.setItem('carrito', JSON.stringify(elemsCarrito));
            
            fetch(`/api/AgregarAlCarrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `titulo=${atributo}`,
            }).then(function(respuesta){
                return respuesta.text();
            }).catch(function(error){
                console.error(error);
            }).then(function(mensaje){
                console.log(mensaje);
            });
        }
    }

    ///Arrancar con tweenLites

    var pri = new TimelineLite();
    pri.delay(0.3);
    pri.add(TweenLite.from(document.querySelector('.titulo'),1.5,{x: -900, opacity: 0, ease: Back.easeOut.config(1.3)}));

    var sec = new TimelineLite();
    sec.delay(0.3);
    sec.add(TweenLite.from(document.querySelector('img'),1.5,{x: -1000, opacity: 0,ease: Back.easeOut.config(0.5)}));

    var qui = new TimelineLite();
    qui.delay(0.4);
    qui.add(TweenLite.from(document.querySelector('hr'),0.9,{y: -205, opacity: 0}));

    var oct = new TimelineLite();
    oct.delay(0.6);
    oct.add(TweenLite.from([document.querySelector('.cuerpo__izq__elementos'), document.querySelector('.pantalones'), document.querySelector('.camisetas'), document.querySelector('.camisas')],0.9,{y: -200, opacity: 0, ease: Back.easeOut.config(1.8)}));

    var cuar = new TimelineLite();
    cuar.delay(0.6);
    cuar.add(TweenLite.from(document.querySelector('.btn__AgregarYcomprar'),0.7,{y: 205, opacity: 0, ease: Back.easeOut.config(1.8)}));
    
    var sex = new TimelineLite();
    sex.delay(0.9);
    sex.add(TweenLite.from(document.querySelector('.btn__volver'),0.7,{x: 205, opacity: 0, ease: Back.easeOut.config(1.8)}));

    var sep = new TimelineLite();
    sep.delay(0.9);
    sep.add(TweenLite.from(document.querySelector('.btn__AgregarYvolver'),0.7,{x: -205, opacity: 0, ease: Back.easeOut.config(1.8)}));
    //tall.add(TweenLite.from(document.querySelector('.verMas'),0.7,{y: 205, opacity: 0}));
    //tall.add(TweenLite.from(document.querySelector('footer'),0.7,{y: 205, opacity: 0}));
});