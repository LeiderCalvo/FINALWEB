const express = require('express');
const hbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
//const path = require('path');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'Tienda';
const client = new MongoClient(url);
var db = null;



//codigo para conectarnos con el cliente que acabamos de crear  
client.connect(function(err){
    if(err){
      console.error(err);
      return;
    }
  
    db = client.db(dbName);
});


// para defnir la carpeta publica
app.use(express.static('public'));
//para registrar el motor de render handlebar
app.engine('handlebars', hbs());
//para setear el motor de render a utiliza
app.set('view engine','handlebars');



//LLAMADO DE LAS RUTAS//////////////////////////////////////////////////////////////////////

//renderizar el template de la pagina   INICIAL T1
app.get('/', function(request, response){
        response.render('inicio');
});

//filtro de talla
app.get(`/tiendaTalla`, function(request, response){
    const coleccion = db.collection('Productos');
    let tit = request.query.producto;
    let talla = request.query.talla;
    //tit.toLowerCase(tit);
    console.log(tit);
    console.log(talla);
    coleccion.find({
                    soy: { 
                         '$eq': tit.toLowerCase(),
                    },
                    tallas:{
                        '$in': [talla],
                    }
    }).toArray(function(err, docs){
        if(err){
            console.error(err);
            response.send(err);
            return;
        }         
        
        var prod = request.query.producto;
        console.log(prod);
    
        var contexto = {
            titulo: prod.toUpperCase(),
            productos: docs,
        };
        
        response.render('home', contexto);
        
    }); 
});

//renderizar la pagina de la    TIENDA DEPENDIENDO   si es camisa, camiseta o pantalon
app.get('/tienda', function(request, response){
    const coleccion = db.collection('Productos');

    var prod = request.query.producto;
    coleccion.find({
       soy: {
        '$eq': prod, 
       }
    }).toArray(function(err, docs){
        if(err){
            console.error(err);
            response.send(err);
            return;
        }        


        console.log(prod);
        console.log(docs);
    
        var contexto = {
            titulo: prod.toUpperCase(),
            productos: docs,
        };
        
        response.render('home', contexto);
        
    });
}); 

//Renderizar la tienda de manera    GENERAL    (todos los productos)
app.get('/tiendageneral', function(request,response){
    const coleccion = db.collection('Productos');

    coleccion.find({}).toArray(function(err,docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        }
        docs.sort(function(a, b){return 0.5 - Math.random()});
        var contexto = { titulo: "GENERAL", productos: docs};
        response.render('home', contexto);
    });
});

//renderizar la pagina de   DESCRIPCION     para el documento
app.get('/descripcion', function(request, response){
    const coleccion = db.collection('Productos');
    var prod = request.query.producto;
    coleccion.find({
        Titulo:{
            '$eq': prod
        }
    }).toArray(function(err, docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        }

        var contexto = {producto: docs};
            response.render('descripcion', contexto);
    });
}); 

// CHECKOUT
app.get('/checkOut', function(request, response){

    const coleccion = db.collection('Carrito');
    coleccion.find({}).toArray(function(err, docs){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 

        var contexto = { pCarrito: docs};
        response.render('checkOut', contexto);
    });
});

app.get('/interaccion', function (request, response) {
    response.render('interaccion');
});

//////////////////////////////////////////////////////RUTAS POST

//Agregar item al carrito
app.post('/api/AgregarAlCarrito', function(request, response){
    const coleccion = db.collection('Productos');
    const coleccion2 = db.collection('Carrito');
    let titulo = request.body.titulo;

    coleccion.find({
        Titulo:{
            '$eq' : titulo
        }
    })
    .toArray(function(err, doc){
        if(err){
            console.log(err);
            response.send(err);
            return;
        } 
        
        coleccion2.find({
            Titulo:{
                '$eq' : titulo
            }
        }).toArray(function(err2, doc2){
            if(err2){
                console.log(err2);
                response.send(err2);
                return;
            } 

            //console.log("exiiiiiste"+doc2[0]);

            if(doc2[0]){
                response.send("ya existe sorry");
                //console.log("ya existe sorry");
                return;
            }else{
                coleccion2.insert(doc[0]);
               // console.log("insertò");
                response.send("insertó");
            }
        });
    });
});

//vaciar carrito
app.post('/api/vaciarCarrito', function(request, response){
    const coleccion = db.collection('Carrito');
    coleccion.remove({});
    response.send("borrado");
});

//Agregar solicitudes
app.post('/api/NuevaSolicitud', function (request, response) {
    const coleccion = db.collection('Peticiones');
    coleccion.insert({
        cuenta: request.body.cuenta,
        cedula: request.body.cedula,
        direccion: request.body.direccion,
        nombre: request.body.nombre,
        productos: request.body.productos
    });
    response.send("Nueva solicitud creada");
});


/*
//ejemplo de como usar el tipo de variable que va con esa ruta (en chrome se escribe /tienda/var=val)
app.get('/tienda/:este', function(request, response){
    var prod = request.params.producto;
    console.log("con :"+prod);
    var contexto = {
        texto: 'Mi texto de prueba'
    };
    response.render('home', contexto);
});
*/
////////////////////////////////////////////////////////////////////////

//iniciar el servidor en el puerto especificado
app.listen(5500);