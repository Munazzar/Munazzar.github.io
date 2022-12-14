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
    if (!["tool-tip","red", "blue", "green", "yellow"].includes(event.target.id) ) {
    if(level==0)
    {
        nextSequence();
        $("body").css("background-color","#011F3F").delay(100);
    }
    
    }
   
   

});

$("#tool-tip").click(function(){
    $("#tooltip").slideToggle(1000);
})

$(".btn").on("click",function(){
 
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    if(gamePattern.length==0)return;
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
        $("h1").text("Game Over, Click Me to Restart");
        userChosenColour = "wrong";
        $("body").css("background-color","red").delay(100);
        // $("body").css("background-color","#011F3F").delay(100);
        
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