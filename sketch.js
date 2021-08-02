//Create variables here
var dog,thedog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj,buttonfeedpet,buttonaddfood




function preload(){


//load images here
dog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();


  //srihith change the size of the canvas also
  createCanvas(1000,400);

  foodObj = new food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  thedog=createSprite(800,200,150,150);
  thedog.addImage(dog);
  thedog.scale=0.3;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 

}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update foodstock and last fed time
function feedDog(){
  thedog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add foodin stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}