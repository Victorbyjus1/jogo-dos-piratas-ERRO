const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var cannon;
var angle;
var cannonBall;
var balls = [];
var ground;
var boat;
var boats = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;


var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var pirataLaughSound, cannonExplosionSound, backgroundSound;

var isGameOver = false;
var isLaughing = false;

function preload(){
  backgroundImg = loadImage("assets/background.gif");

  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");

  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
 brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");

 pirateLaughSound = loadSound("assets/pirate_laugh.mp3");
 cannonExplosionSound = loadSound("assets/cannon_explosion.mp3");
 backgroundSound = loadSound("assets/background_music.mp3");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI/4;

  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 130, 100, angle);
  ground = new Ground(0, height - 1, width * 2, 1);
  

  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);


    
  }
  
  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++){
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);


    
  }
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, width, height);

  tower.display();
  cannon.display();
  ground.display();

  for (var i = 0; i < balls.length; i++){
    showCannonBall(balls[i], i);
   for(var j = 0; j < boats.length; j++){
    if(balls[i] !== undefined && boats[j] !== undefined){
      var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
      if(collision.collided){
        boats[j].remove(j);

        World.remove(world,balls[i].body);
        balls.splice(i, 1);
        i--;
      }
    }
   }
  }



  showBoat();
  

 
  
  for (var i = 0; i < balls.length; i++){
    showCannonBall(balls[i], i);
  }

 

  Engine.update(engine);
}

function showCannonBall(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyPressed(){
  if (keyCode == 32){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function keyReleased(){
  if (keyCode == 32){
    cannonExplosionSound.play();
    balls[balls.length - 1].shoot();
  }
}

  function showBoat(){
    if (boats.length > 0){
      if (boats.length < 4 && boats [boats.length - 1].body.position.x < width - 300){
        var positions = [-40,-60,-70,-20];
        var position = random(positions);
        var boat = new Boat(width,height, - 100, 170,170, position, boatAnimation);
        
      
      boats.push(boat);
    
}
for (var i = 0; i < boats.length; i++){
  Body.setVelocity(boats[i].body, {x: -0.09, y:0});
  boats[i].display();
  boats[i].animate();

  var collision = Matter.SAT.collides(tower.body, boats[i].body);
  if(collision.collided && !boats[i].isBroken){
    if(!isLaughing && !pirateLaughSound.isPlaying()){
      pirateLaughSound.play();
      isLaughing = true;
    }
    isGameOver = true;
    gameOver();
  }
}
 }else{
  var boat = new Boat(width,height - 100, 200,200, -80, boatAnimation);
  boats.push(boat);
  }
}
function gameOver(){
  swal(
    {
    title:"Fim de jogo!",
    confirmButtonText: "Jogar Novamente"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }
  )
}
