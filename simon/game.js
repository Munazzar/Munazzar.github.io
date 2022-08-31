var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var indexCheck = 0;

function nextSequence(){

    level+=1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    
}



$("body").on("click keypress",function(event){
    if (event.target.id != "tool-tip") {
        if(level==0)
    {
        nextSequence();
    }
    
    }
   
   

});

$("#tool-tip").click(function(){
    $("#tooltip").slideToggle(1000);
})

$(".btn").on("click",function(){
 
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    if(gamePattern[indexCheck] == userChosenColour ){
        indexCheck+=1;
        if(indexCheck == gamePattern.length){
            indexCheck = 0;
            setTimeout(function(){
                nextSequence();
              }, 1000);
           
        }
    }
    else{
        indexCheck = 0;
        gamePattern = [];
        level = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
        userChosenColour = "wrong";
    }
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function playSound(name){
    const audioElement = new Audio(`sounds/${name}.mp3`);
    audioElement.play();
    
   
}
    
function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed").delay(100);
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
      }, 100);
  
}