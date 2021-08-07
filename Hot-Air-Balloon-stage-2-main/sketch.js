var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameState = "play";
var score = 0;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
gameOverImage = loadImage("assets/gameOver.png")

}

function setup(){

  createCanvas(windowWidth,windowHeight)
//background image
bg = createSprite(width/2,height/2,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

buildingGroup = createGroup();
buildingGroup1 = createGroup(); 
birdGroup = createGroup();

gameOver = createSprite(width/2,height/2,1,1)
gameOver.addImage(gameOverImage);
gameOver.visible = false;





}

function draw() {
  
  background("black");
  if(gameState ==="play"){
    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;
     spawnObstaclesTop();
     spawnObstaclesBottom();
     spawnObstaclesBottom2();

     if(balloon.isTouching(buildingGroup)){
       gameState = "end";
       
     }
     if(balloon.isTouching(buildingGroup1)){
      gameState = "end";
      
    }
    score = score+round(frameRate()/60);
   

  }
  if(gameState==="end"){
    buildingGroup.setVelocityXEach(0);
       birdGroup.setVelocityXEach(0);
       gameOver.visible = true;
       buildingGroup.setLifetimeEach(-1);
       birdGroup.setLifetimeEach(-1);
       buildingGroup1.setVelocityXEach(0);
       buildingGroup1.setLifetimeEach(-1);

  }
        
          

           
          Bar();
   
        drawSprites();
        textSize(30);
        fill("black");
        text("Score : "+score,50,50)
       
        //spawning top obstacles
     
      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 230 === 0) {
        obstacleTop = createSprite(width-10,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -7;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 300;
    
   balloon.depth = balloon.depth + 1;
   birdGroup.add(obstacleTop)
   
      }
}
function spawnObstaclesBottom() 
{
      if(World.frameCount % 190 === 0) {
        obstacleTop = createSprite(width-10,400,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.2;
    obstacleTop.velocityX = -5;

    //random y positions for top obstacles
    

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsBottom1);
              break;
      case 2: obstacleTop.addImage(obsBottom3);
              break;
     
      
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 300;
    
   balloon.depth = balloon.depth + 1;
   buildingGroup.add(obstacleTop)
   
      }
}
function spawnObstaclesBottom2() 
{
      if(World.frameCount % 290 === 0) {
        obstacleTop = createSprite(width-10,450,40,50);
        obstacleTop.addImage(obsBottom2);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.15;
    obstacleTop.velocityX = -5;

    //random y positions for top obstacles
    

    //generate random top obstacles
   

     //assign lifetime to the variable
   obstacleTop.lifetime = 300;
    
   balloon.depth = balloon.depth + 1;
   buildingGroup1.add(obstacleTop)
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(width-10,200,10,800);
          bar.velocityX = 0
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}


  
