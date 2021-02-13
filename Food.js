class Food{

constructor(){
this.foodStock=0
this.lastFed
this.image=loadImage("images/Milk.png")
}
updateFoodStock(fs){
   this.foodStock=fs
   

}
getFoodStock(){
    return this.foodStock

}
deductFood(){
    if(this.foodStock>0){
        this.foodStock-=1
    }
}
gedFedTime(gft){
this.lastFed=gft



}


display(){
    
fill(255, 255, 254);
textSize(15);
if(lastFed>=12)
{

text("last feed: "+lastFed%12+ " PM", 350, 30);


}else if(lastFed===0){
  text("Last Feed:12 AM", 350, 30);

}else{
  text("lastFeed : "+ lastFed + " AM", 350, 30)
}
   var x=80, y=100;
   
   imageMode(CENTER);
   if(this.foodStock!=0){
       for(var i=0; i<this.foodStock;i++){
           if (i%10 ===0){
               x=80
               y=y+50
           }
           image(this.image, x, y, 50, 50);
           x=x+30
       }

   }
}
bedroom(){
    background(bedRoom, 550, 500)
}
garden(){
    background(garden, 550, 500)
}
washroom(){
    background(washRoom, 550, 500)
}
}
