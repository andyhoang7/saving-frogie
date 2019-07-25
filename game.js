/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

let bgReady, heroReady, monsterReady, monster1Ready, monster2Ready, monster3Ready, monster4Ready, monster5Ready, monster6Ready, monster7Ready, rewardReady;
let bgImage, heroImage, monsterImage, monster1Image, monster2Image, monster3Image, monster4Image, monster5Image, monster6Image, monster7Image, rewardImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 6000;
let elapsedTime = 0;


let game = {
  startspeed: 1,
  difficulty: 1,
  listeningToKeyboard: true,
  level: 1,

};
let tries = 0

const startlife = 10
var triesleft = startlife - tries;

function loadImages() {
  console.log("load image")
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/frogicon.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster1Image = new Image();
  monster1Image.onload = function () {
    // show the monster image
    monster1Ready = true;
  };
  monster1Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster2Image = new Image();
  monster2Image.onload = function () {
    // show the monster image
    monster2Ready = true;
  };
  monster2Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster3Image = new Image();
  monster3Image.onload = function () {
    // show the monster image
    monster3Ready = true;
  };
  monster3Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster4Image = new Image();
  monster4Image.onload = function () {
    // show the monster image
    monster4Ready = true;
  };
  monster4Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster5Image = new Image();
  monster5Image.onload = function () {
    // show the monster image
    monster5Ready = true;
  };
  monster5Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster6Image = new Image();
  monster6Image.onload = function () {
    // show the monster image
    monster6Ready = true;
  };
  monster6Image.src = "images/snake2.png";

  // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
  monster7Image = new Image();
  monster7Image.onload = function () {
    // show the monster image
    monster7Ready = true;
  };
  monster7Image.src = "images/snake2.png";

 // K - PUT MORE MONSTERS HERE TO CREATE OBSTACLES
 rewardImage = new Image();
 rewardImage.onload = function () {
   // show the monster image
   rewardReady = true;
 };
 rewardImage.src = "images/reward.png";
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height - 32;

let monsterX = 0;
let monsterY = 50;

let monster1X = canvas.width - 32;
let monster1Y = 100;

let monster2X = 0;
let monster2Y = 150;

let monster3X = canvas.width - 32;
let monster3Y = 200;

let monster4X = 0;
let monster4Y = 250;

let monster5X = canvas.width - 32;
let monster5Y = 300;

let monster6X = 0;
let monster6Y = 350;

let monster7X = canvas.width - 32;
let monster7Y = 400;

let monsterDirectionX = 1;
let monster1DirectionX = 1;
let monster2DirectionX = 1;
let monster3DirectionX = 1;
let monster4DirectionX = 1;
let monster5DirectionX = 1;
let monster6DirectionX = 1;
let monster7DirectionX = 1;

let rewardX = Math.floor(Math.random() * (canvas.width-150) + 80)
let rewardY = Math.floor(Math.random() * (canvas.height-150) + 80)



/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
    game.listeningToKeyboard = true;
  }, false);
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  let monsterspeed = game.startspeed * game.difficulty + 2
  let monster1speed = game.startspeed * game.difficulty + 2.5
  let monster2speed = game.startspeed * game.difficulty + 1.5
  let monster3speed = game.startspeed * game.difficulty + 4
  let monster4speed = game.startspeed * game.difficulty + 2
  let monster5speed = game.startspeed * game.difficulty + 2.5
  let monster6speed = game.startspeed * game.difficulty + 1.5
  let monster7speed = game.startspeed * game.difficulty + 3

  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (game.listeningToKeyboard) {
    if (38 in keysDown) { // Player is holding up key
      heroY -= 4;
    }
    if (40 in keysDown) { // Player is holding down key
      heroY += 4;
    }
    if (37 in keysDown) { // Player is holding left key
      heroX -= 4;
    }
    if (39 in keysDown) { // Player is holding right key
      heroX += 4;
    }
  }
  //K - Stopping hero from go beyond canvas
  heroX = Math.min(canvas.width - 32, heroX);
  heroX = Math.max(0, heroX);
  heroY = Math.min(canvas.height - 32, heroY);
  heroY = Math.max(0, heroY);
  // K first monster
  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 30)
    && monsterY <= (heroY + 30)
    || heroX <= (monster1X + 32)
    && monster1X <= (heroX + 32)
    && heroY <= (monster1Y + 30)
    && monster1Y <= (heroY + 30)
    || heroX <= (monster2X + 32)
    && monster2X <= (heroX + 32)
    && heroY <= (monster2Y + 30)
    && monster2Y <= (heroY + 30)
    || heroX <= (monster3X + 32)
    && monster3X <= (heroX + 32)
    && heroY <= (monster3Y + 30)
    && monster3Y <= (heroY + 30)
    || heroX <= (monster4X + 32)
    && monster4X <= (heroX + 32)
    && heroY <= (monster4Y + 30)
    && monster4Y <= (heroY + 30)
    || heroX <= (monster5X + 32)
    && monster5X <= (heroX + 32)
    && heroY <= (monster5Y + 30)
    && monster5Y <= (heroY + 30)
    || heroX <= (monster6X + 32)
    && monster6X <= (heroX + 32)
    && heroY <= (monster6Y + 30)
    && monster6Y <= (heroY + 30)
    || heroX <= (monster7X + 32)
    && monster7X <= (heroX + 32)
    && heroY <= (monster7Y + 30)
    && monster7Y <= (heroY + 30)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    heroX = canvas.width / 2;
    heroY = canvas.height - 32;
    tries += 1;
    game.listeningToKeyboard = false;

    monsterX = 0;
    monsterY = 50;

    monster1X = 0;
    monster1Y = 100;

    monster2X = 0;
    monster2Y = 150;

    monster3X = 0;
    monster3Y = 200;

    monster4X = 0;
    monster4Y = 250;

    monster5X = 0;
    monster5Y = 300;

    monster6X = 0;
    monster6Y = 350;

    monster7X = 0;
    monster7Y = 400;
  }
  if (
    heroX <= (rewardX + 32)
    && rewardX <= (heroX + 32)
    && heroY <= (rewardY + 30)
    && rewardY <= (heroY + 30)
  ){
    tries -=1
    rewardX = -50
    rewardY = -50
  }
  // // Check if player and monster collided. Our images
  // // are about 32 pixels big.
  // if (
  //   heroX <= (monsterX + 32)
  //   && monsterX <= (heroX + 32)
  //   && heroY <= (monsterY + 32)
  //   && monsterY <= (heroY + 32)
  // ) {
  //   // Pick a new location for the monster.
  //   // Note: Change this to place the monster at a new, random location.
  //   monsterX = monsterX + 50;
  //   monsterY = monsterY + 70;
  // }

  monsterX += monsterspeed * monsterDirectionX;
  monsterY = monsterY;
  if (
    monsterX >= canvas.width - 32
  ) {
    monsterX = canvas.width - 32
    monsterDirectionX = -1;
  } else if (
    monsterX <= 0
  ) {
    monsterX = 0
    monsterDirectionX = 1;
  }

  monster1X += monster1speed * monster1DirectionX;
  monster1Y = monster1Y;
  if (
    monster1X >= canvas.width - 32
  ) {
    monster1X = canvas.width - 32
    monster1DirectionX = -1;
  } else if (
    monster1X <= 0
  ) {
    monster1X = 0
    monster1DirectionX = 1;
  }
  
  monster2X += monster2speed * monster2DirectionX;
  monster2Y = monster2Y;
  if (
    monster2X >= canvas.width - 32
  ) {
    monster2X = canvas.width - 32
    monster2DirectionX = -1;
  } else if (
    monster2X <= 0
  ) {
    monster2X = 0
    monster2DirectionX = 1;
  }

  monster3X += monster3speed * monster3DirectionX;
  monster3Y = monster3Y;
  if (
    monster3X >= canvas.width - 32
  ) {
    monster3X = canvas.width - 32
    monster3DirectionX = -1;
  } else if (
    monster3X <= 0
  ) {
    monster3X = 0
    monster3DirectionX = 1;
  }
  monster4X += monster4speed * monster4DirectionX;
  monster4Y = monster4Y;
  if (
    monster4X >= canvas.width - 32
  ) {
    monster4X = canvas.width - 32
    monster4DirectionX = -1;
  } else if (
    monster4X <= 0
  ) {
    monster4X = 0
    monster4DirectionX = 1;
  }
  monster5X += monster5speed * monster5DirectionX;
  monster5Y = monster5Y;
  if (
    monster5X >= canvas.width - 32
  ) {
    monster5X = canvas.width - 32
    monster5DirectionX = -1;
  } else if (
    monster5X <= 0
  ) {
    monster5X = 0
    monster5DirectionX = 1;
  }
  monster6X += monster6speed * monster6DirectionX;
  monster6Y = monster6Y;
  if (
    monster6X >= canvas.width - 32
  ) {
    monster6X = canvas.width - 32
    monster6DirectionX = -1;
  } else if (
    monster6X <= 0
  ) {
    monster6X = 0
    monster6DirectionX = 1;
  }
  monster7X += monster7speed * monster7DirectionX;
  monster7Y = monster7Y;
  if (
    monster7X >= canvas.width - 32
  ) {
    monster7X = canvas.width - 32
    monster7DirectionX = -1;
  } else if (
    monster7X <= 0
  ) {
    monster7X = 0
    monster7DirectionX = 1;
  }
  //K -  win
  if (heroY <= 32 && game.level > 10 ) {
// save records
  } else if (heroY <=32) {
    heroY = canvas.height - 32
    game.level += 1;
    game.listeningToKeyboard = false;
    game.difficulty += 0.5;
    rewardX = Math.floor(Math.random() * (canvas.width-150) + 80)
    rewardY = Math.floor(Math.random() * (canvas.height-150) + 80)
   }

  if (SECONDS_PER_ROUND - elapsedTime === 0 || tries === 10) {
    game.listeningToKeyboard = false;
       return
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }

  if (rewardReady) {
    ctx.drawImage(rewardImage, rewardX, rewardY);
  }

  if (monsterReady && monsterDirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monsterImage, -monsterX - 32, monsterY);
    ctx.restore();
  } else {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }

  if (monster1Ready && monster1DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster1Image, -monster1X - 32, monster1Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster1Image, monster1X, monster1Y);
  }

  if (monster2Ready && monster2DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster2Image, -monster2X - 32, monster2Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster2Image, monster2X, monster2Y);
  }

  if (monster3Ready && monster3DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster3Image, -monster3X - 32, monster3Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster3Image, monster3X, monster3Y);
  }

  if (monster4Ready && monster4DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster4Image, -monster4X - 32, monster4Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster4Image, monster4X, monster4Y);
  }

  if (monster5Ready && monster5DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster5Image, -monster5X - 32, monster5Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster5Image, monster5X, monster5Y);
  }

  if (monster6Ready && monster6DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster6Image, -monster6X - 32, monster6Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster6Image, monster6X, monster6Y);
  }

  if (monster7Ready && monster7DirectionX === 1) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(monster7Image, -monster7X - 32, monster7Y);
    ctx.restore();
  } else {
    ctx.drawImage(monster7Image, monster7X, monster7Y);
  }

  if (heroY <= 32 && game.level > 10 ){
    ctx.fillRect(50, 50, canvas.width-100, canvas.height-100);
    ctx.fillStyle = "black";
    
    ctx.fillText('CONGRATULATION, YOU HAVE WON THE GAME', canvas.width/2 , canvas.height/2);
    ctx.fillStyle = "orange";
    ctx.font = "10pt Courier";
    ctx.textAlign = "center";
}

if ( tries === 10 || SECONDS_PER_ROUND - elapsedTime <= 0 ){
  ctx.fillRect(50, 50, canvas.width-100, canvas.height-100);
  ctx.fillStyle = "black";
  
  ctx.fillText('YOU NOOB! Froggie got eaten!', canvas.width/2 , canvas.height/2);
  ctx.fillText('Hit reset button to try again', canvas.width/2 , canvas.height/2 +50);
  ctx.fillStyle = "orange";
  ctx.font = "10pt Courier";
  ctx.textAlign = "center";
}




  document.getElementById("remainingtime").innerHTML = SECONDS_PER_ROUND - elapsedTime;
  document.getElementById("remainingattempt").innerHTML = startlife - tries;
  document.getElementById("level").innerHTML = game.level;

};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
function startgame(){
loadImages();
setupKeyboardListeners();
main();
document.getElementById("startgame").style.visibility = "hidden";
}



function resetgame() {
  heroX = canvas.width / 2;
  heroY = canvas.height - 32;

  monsterX = 0;
  monsterY = 50;

  monster1X = canvas.width - 32;
  monster1Y = 100;

  monster2X = 0;
  monster2Y = 150;

  monster3X = canvas.width - 32;
  monster3Y = 200;

  monster4X = 0;
  monster4Y = 250;

  monster5X = canvas.width - 32;
  monster5Y = 300;

  monster6X = 0;
  monster6Y = 350;

  monster7X = canvas.width - 32;
  monster7Y = 400;
  rewardX = Math.floor(Math.random() * (canvas.width-150) + 80)
  rewardY = Math.floor(Math.random() * (canvas.height-150) + 80)
  monsterDirectionX = 1;
  monster1DirectionX = 1;
  monster2DirectionX = 1;
  monster3DirectionX = 1;
  monster4DirectionX = 1;
  monster5DirectionX = 1;
  monster6DirectionX = 1;
  monster7DirectionX = 1;
  elapsedTime = 0
  tries = 0
  game.listeningToKeyboard = true;
  startTime = Date.now()
}