var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg);
path.velocityY = 4;


boy = createSprite(windowWidth/2,windowHeight-80,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
    
  if(path.y > 400 ){
    path.y = height/3.5;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      cashG.velocityY = path.velocityY;
      
      path.velocityY = path.velocityY + 0.4;
      
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+150;
      diamondsG.velocityY = path.velocityY;
      
      path.velocityY = path.velocityY + 1.2;
      
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
      path.velocityY = path.velocityY + 0.8;
     jwelleryG.velocityY = path.velocityY ;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        endgame=createSprite(windowWidth/2,windowHeight/2);
        endgame.addAnimation("ended",endImg);
        
        boy.destroy();
                        
        cashG.destroyEach();
        cashG.setVelocityEach(0);
        
        diamondsG.destroyEach();
        diamondsG.setVelocityEach(0);
        
        jwelleryG.destroyEach();
        jwelleryG.setVelocityEach(0);
        
        swordGroup.destroyEach();
        swordGroup.setVelocityEach(0);
     }
  }
      
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40,10,10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = path.velocityY;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = path.velocityY;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = path.velocityY;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = path.velocityY;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}