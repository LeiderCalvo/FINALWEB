var system;
var canvas;
var particulas = [];
var img;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketchHolder');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-2');
    centerCanvas();
    particulas.push(new Particle(createVector(random(width), random(height))));
    img = loadImage("/imgs/fondo.jpg");
}

function draw() {
  //background(226,226,228);
  image(img, 0, 0);
  rectMode(CENTER);

  if(frameCount%70==0){
     // for (let index = 0; index < random(3,7); index++) {
          particulas.push(new Particle(createVector(random(width), random(height))));
   //   }
  }

  for (var i = particulas.length-1; i >= 0; i--) {
    var p = particulas[i];
    p.mover();
    p.pintar();
    if (p.isMuerto()) {
      particulas.splice(i, 1);
    }
  }
}

// Clase particula
var Particle = function(pos) {
  this.acel = createVector(0, random(-0.05, 0.05));
  this.vel = createVector(random(-1, 1), random(-1, 0));
  this.pos = pos.copy();
  this.vida = 255;
  this.ran = random(100,153);
};

//mover particula
Particle.prototype.mover = function(){
  this.vel.add(this.acel);
  this.pos.add(this.vel);
  this.vida -= 2;
};

//pintar particula
Particle.prototype.pintar = function() {
  //stroke(200, this.vida);
  //strokeWeight(2);
  noStroke();
  fill(this.ran,this.ran,this.ran, this.vida);
  rect(this.pos.x, this.pos.y, 12, 12);
  //ellipse(this.pos.x, this.pos.y, 12, 12);
};

// get muerto
Particle.prototype.isMuerto = function(){
  return this.vida < 0;
};

function centerCanvas() {
    var x = (window.innerWidth - width) / 2;
    var y = (window.innerHeight - height) / 2;
    canvas.position(x, y);
    noCursor();
  }

window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;  
    canvas.size(w,h);
    width = w;
    height = h;
    centerCanvas()
  };

  function mousePressed() {
      for (let index = 0; index < 10; index++) {
          particulas.push(new Particle(createVector(random(width), random(height))));
      }
  }