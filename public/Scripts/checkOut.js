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
});