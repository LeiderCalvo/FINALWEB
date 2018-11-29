window.addEventListener('load', function(){
    
    function actualizarPrecio() {
        var t = document.querySelectorAll('.precio');
        var precio = 0;
        t.forEach(element => {
            var pre = element.getAttribute('data-precio');
            precio +=  parseInt(pre);        
        });
        var total = document.querySelector('.total');
        total.innerText = `TOTAL: ${precio}`;
    }

    var x = document.querySelectorAll('.color');
    x.forEach(element => {
        //console.log("actualiza el color");
        var color = element.getAttribute('data-color'); 
        switch (color) {
            case "Negro":
                element.style.backgroundColor = "black";
                break;
            case "Verde":
                element.style.backgroundColor = "green";
                break;
            case "Blanco":
                element.style.backgroundColor = "white";
                break;
            case "Gris":
                element.style.backgroundColor = "gray";
                break;
            case "Rosado":
                element.style.backgroundColor = "pink";
                break;
            case "Cafe":
                element.style.backgroundColor = "brown";
                break;
            case "Azul":
                element.style.backgroundColor = "blue";
                break;
        }
    });

    actualizarPrecio();

    document.querySelector('.btnVaciar').addEventListener('click', function(){
        localStorage.clear();

        fetch(`/api/vaciarCarrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: ``,
        }).then(function(respuesta){
            return respuesta.text();
        }).catch(function(error){
            console.error(error);
        }).then(function(mensaje){
            console.log(mensaje);
        });

        window.location.href = "/checkOut";
    });

    document.querySelector('.btn').addEventListener('click', function(){
       var cuenta = document.getElementById('numeroDeCuenta').value;
       var cedula = document.getElementById('cedula').value;
       var direccion = document.getElementById('direccion').value;
       var nombre = document.getElementById('nombre').value;
       var check = document.getElementById('condiciones').checked;
        
        console.log(check);

       if(cuenta == '' || cedula == '' || direccion == '' || nombre == '' || check == false){
           alert("Por favor llene todos los campos");    
           return;
        }else{
            var productos = JSON.parse(localStorage.getItem('carrito'));
            //console.log(productos);
        
            fetch(`/api/NuevaSolicitud`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `productos=${productos}&cuenta=${cuenta}&cedula=${cedula}&direccion=${direccion}&nombre=${nombre}`,
            }).then(function(respuesta){
                return respuesta.text();
            }).catch(function(error){
                console.error(error);
            }).then(function(mensaje){
                console.log(mensaje);
            });

            window.location.href = "/tiendageneral";
       }
    }); 

    document.querySelector('.btnVolver').addEventListener('click', function(){
        window.location.href = "/tiendageneral";
    });

    //Introducción con greenSock
    var r = new TimelineLite();
    r.delay(0.4);
    r.add(TweenLite.from(document.querySelector('.logos'),0.9,{opacity:0}));

    var s = new TimelineLite();
    s.delay(0.4);
    s.add(TweenLite.from(document.querySelector('.form'),0.9,{opacity:0}));

    var t = new TimelineLite();
    t.delay(0.4);
    t.add(TweenLite.from(document.querySelector('.terms'),0.9,{opacity:0}));

    var pri = new TimelineLite();
    pri.add(TweenLite.from(document.querySelector('.cuerpo__der'),0.7,{x: 900, opacity: 0, ease: Power4.easeOut}));
    pri.add(TweenLite.from(document.querySelector('.tit'),0.4,{y:-60, opacity:0}));

    var boton = new TimelineLite();
    boton.delay(0.7);
    boton.add(TweenLite.from(document.querySelector('.btn'),0.4,{y:60, opacity:0}));

    var items = document.querySelectorAll('.cuerpo__izq__item');
    var temp = new TimelineLite();
    temp.delay(0.2);
    items.forEach(element => {
        temp.add(TweenLite.from(element,0.4,{x: -205, opacity: 0})); 
    });

    var cuar = new TimelineLite();
    cuar.add(TweenLite.from(document.querySelector('.btnVaciar'),0.7,{y: 205, opacity: 0, ease: Back.easeOut.config(1.8)}));
    
    var sex = new TimelineLite();
    sex.delay(0.2);
    sex.add(TweenLite.from(document.querySelector('.btnVolver'),0.7,{x: 205, opacity: 0, ease: Back.easeOut.config(1.8)}));

    var sep = new TimelineLite();
    sep.delay(0.2);
    sep.add(TweenLite.from(document.querySelector('.total'),0.7,{x: -205, opacity: 0, ease: Back.easeOut.config(1.8)}));

});