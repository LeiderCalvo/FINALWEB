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
});
