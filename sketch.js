var ironMan;
var bg, backgroundImg;
var stone, stoneGroup, stoneImage;
var diamondGroup, diamondImage, Score = 0;
var spikeImage, obstacleGroup;

function preload() {
  //Loading Images For Background,Iron Man,Stones,Diamonds And Spikes
  backgroundImg = loadImage("images/bg.jpg");
  ironMan_Image = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

function setup() {
  //Creating Canvas
  createCanvas(1340, 615);

  //Background Sprite
  bg = createSprite(580, 300);
  bg.addImage(backgroundImg);
  bg.scale = 1.2;
  bg.velocityX = -6;

  //Iron Man Sprite
  ironMan = createSprite(30, 500, 20, 20);
  ironMan.addImage(ironMan_Image);
  ironMan.scale = 0.3;

  //Ground Sprite
  ground = createSprite(1, 580, 3000, 10);
  ground.visible = false;

  //Creating Groups
  stoneGroup = new Group();
  diamondGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //Reloading Background
  if (bg.x < 500) {
    bg.x = bg.width / 2;
  }
  //Preventing Iron Man From Going Out Of The Screen
  if (ironMan.x < 200) {
    ironMan.x = 200;
  }
  //Preventing Iron Man From Going Out Of The Screen From The Top
  if (ironMan.y < 50) {
    ironMan.y = 50;
  }
  //Moving Iron Man Using Arrow Keys
  if (keyDown("up")) {
    ironMan.velocityY = -10
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5
  }

  //Gravity
  ironMan.velocityY = ironMan.velocityY + 0.5;

  ironMan.collide(ground);

  //Preventing Iron Man From Going Through The Stones
  generateStones();
  for (var i = 0; i < (stoneGroup).length; i++) {
    var temp = (stoneGroup).get(i);
    if (ironMan.isTouching(temp)) {
      ironMan.collide(temp);
    }
  }

  //If Iron Man Touches The Diamond,The Score Increases by 1 And The Diamond Is Destroyed
  GenerateDiamonds();
  for (var i = 0; i < (diamondGroup).length; i++) {
    var temp = (diamondGroup).get(i);
    if (temp.isTouching(ironMan)) {
      Score++;
      temp.destroy();
      temp = null;
    }
  }

  //If Mario Touches The Spike,The Score Decreases By 5 And The Spike Is Destroyed
  generateSpikes();
  for (var i = 0; i < (obstacleGroup).length; i++) {
    var temp = (obstacleGroup).get(i);
    if (temp.isTouching(ironMan)) {
      Score = Score - 5;
      temp.destroy();
      temp = null;
    }
  }

  drawSprites();

  //Creating Score Count
  textSize(20);
  fill("blue");
  text("Diamonds Collected:" + Score, 500, 20);

  //Function To Generate Stones
  function generateStones() {
    if (frameCount % 70 === 0) {
      var stone = createSprite(1200, 120, 40, 10);
      stone.y = random(50, 600);
      stone.addImage(stoneImage);
      stone.velocityX = -6;
      stone.scale = 0.5;
      stone.lifetime = 250;
      stoneGroup.add(stone);
    }
  }
  //Function To Generate Diamonds
  function GenerateDiamonds() {
    if (frameCount % 50 === 0) {
      var diamond = createSprite(1200, 120, 40, 10);
      diamond.addImage(diamondImage);
      diamond.scale = 0.5;
      diamond.y = random(80, 450);
      diamond.velocityX = -3;
      diamond.lifetime = 350;
      diamondGroup.add(diamond);
    }
  }
  //Function To Generate Spikes
  function generateSpikes() {
    if (frameCount % 60 === 0) {
      var spike = createSprite(1200, 585, 10, 40);
      spike.addImage(spikeImage);
      spike.scale = 0.5;
      spike.y = random(80, 450);
      spike.velocityX = -3;
      spike.lifetime = 350;
      obstacleGroup.add(spike);
    }
  }
}