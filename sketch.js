var dog, dogimg, dogimg2;
var database;
var FoodStk;
var addFood, feeddog;
var foodObj, foodS;
var lastFed;
var garden;
var gameState, readstate;
var bedRoom, washRoom;
function preload()
{
dogimg=loadImage("images/dogImg.png")
dogimg2=loadImage("images/dogImg1.png")
garden=loadImage("images/Garden.png")
bedRoom=loadImage("images/Wash Room.png")
washRoom=loadImage("images/Bed Room.png")


}

function setup() {
  database=firebase.database()
	createCanvas(1000, 700);
  foodObj=new Food()
dog=createSprite(800, 200, 20, 20)
 dog.addImage(dogimg) 
dog.scale=0.2;
fedTime=database.ref('LastFed')
fedTime.on("value", function (data){
  lastFed=data.val()
})

readstate=database.ref('gameState')
readstate.on("value", function (data){
  gameState=data.val()
})
FoodStk=database.ref('FoodStock')
FoodStk.on("value", readStk)

addFood=createButton("ADD THE FOOD")
addFood.position(400, 100);
addFood.mousePressed(addFoods)

feedDog=createButton("CLICK TO FEED")
feedDog.position(600, 100);
feedDog.mousePressed(eat)

}


function draw() {  
  background("Orange")
  foodObj.display()
  currentTime=hour()
  if(currentTime===(lastFed+1)){
update("playing")
foodObj.garden()
  }else   if(currentTime===(lastFed+2)){
    update("sleeping")
    foodObj.bedroom()
  } else if(currentTime===(lastFed+2)&& currentTime<=lastFed+4){
    update("bathing")
    foodObj.washroom()
  }

else{ 
update ("hungry")
foodObj.display()

}
if (gameState!="hungry"){

  addFood.hide()
  feedDog.hide()
  dog.remove()
  
}else {
  feedDog.show()
  addFood.show()
  dog.addImage(dogimg)
}
  drawSprites();
  }
function readStk(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
  
}


function addFoods(){
foodS++
database.ref('/').update({
  FoodStock:foodS

})



}
function eat(){
  dog.addImage(dogimg2);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  } 

database.ref('/').update({
 FoodStock :foodObj.getFoodStock(),
  LastFed:hour()
})


}
function update(state){
database.ref('/').update({
  gameState:state
})
}



