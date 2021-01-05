var dog;
var dogImg_normal,dogImg_happy;
var database;
var foodCount;
var foodObj;
var foodStock,lastfed;
var feed,addFood;
var food;

function preload(){

   dogImg_normal=loadImage("Images/Dog.png");
   dogImg_happy=loadImage("Images/happydog.png");

   addFoods();
   FeedDog();
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg_normal);
  dog.scale=0.15;

  //.on means continously monitoring
  foodStock = database.ref('Food');
  foodStock.on("value", function readStock(data){
    foodCount=data.val();
  })
 
 feed = createButton("Feed The Dog") ;
 feed.position(400,90);
 feed.mousePressed(FeedDog);

 addFood = createButton("Add Food");
 addFood.position(750,90);
 addFood.mousePressed(addFoods);
}

// function to display UI
function draw() {
  background(46,139,87);
 
  fill(255,255,254);
  textSize(15);
  if(lastfed>=12){
    text("Last Feed : "+ lastFed%12 + " PM ", 300,30);
  }else if(lastfed==0){
    text("Last Feed : 12 AM",300,30);
  }else{
    text("Last Feed : "+ lastfed + "AM",300,30);
  }
 

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : " + foodCount,170,200);
  
  
}

function FeedDog(){

dog.addImage(dogImg_happy);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    food:foodStock
  })
}