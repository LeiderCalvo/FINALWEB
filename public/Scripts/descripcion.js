window.addEventListener('load', function(){
    document.querySelector('.btn__volver').addEventListener('click', function(){
        window.location.href = "/tiendageneral";
    });

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
});