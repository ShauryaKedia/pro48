var database;
var gameState = 0
var allPlayers;
var player, form, game;
var playerCount;
var bullet1Img, bullet2Img, soldier1Img, soldier2Img, wallImg, bgImg;
var player1, player2,players;
var wall,wallGroup;
var bullet1,bullet2,bulletGroup;
var border;
var wallX,wallY;
var playersFinished = 0;

function preload(){
  bullet1Img = loadImage("Pictures/bullet 1.png")
  bullet2Img = loadImage("Pictures/bullet 2.png")
  soldier2Img = loadImage("Pictures/Soldier2.png")
  soldier1Img = loadImage("Pictures/Soldier1.png")
  //wallImg = loadImage("Pictures/wall.png")
  bgImg = loadImage("Pictures/bg.jpg")
  

}


function setup() {
  createCanvas(displayWidth-50,displayHeight-50);
  image(bgImg,displayWidth/2,displayHeight/2,displayWidth,displayHeight)

  database = firebase.database()

  game = new Game()
  game.getState()
  game.start()
}

function draw() {
  background(bgImg);
  if(playerCount === 2){
    game.updateState(1)
  }  
  if(gameState === 1){
    clear()
    game.play()
  }
  if(gameState === 2){
    game.end()
  }
}