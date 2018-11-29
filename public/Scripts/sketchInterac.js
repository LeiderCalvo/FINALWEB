var system;
var canvas;
var particulas = [];

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketchHolder');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-2');
    centerCanvas();
    particulas.push(new Particle(createVector(random(width), random(height))));
}

function draw() {
  background(51);
  rectMode(CENTER);

  if(frameCount%200==0){
      for (let index = 0; index < random(5,10); index++) {
          particulas.push(new Particle(createVector(random(width), random(height))));
      }
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
};

//mover particula
Particle.prototype.mover = function(){
  this.vel.add(this.acel);
  this.pos.add(this.vel);
  this.vida -= 2;
};

//pintar particula
Particle.prototype.pintar = function() {
  stroke(200, this.vida);
  strokeWeight(2);
  fill(127, this.vida);
  rect(this.pos.x, this.pos.y, 12, 12);
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
      for (let index = 0; index < 20; index++) {
          particulas.push(new Particle(createVector(random(width), random(height))));
      }
  }