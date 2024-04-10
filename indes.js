var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=true;
var level=0;
$(document).keypress(function(){
    if(started){
        $("#level-title").html("Level "+level);
        started =false;
        nextSequence(); 
    }
});
function nextSequence(){
    level++;
    $("#level-title").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var len = userClickedPattern.length-1; 
    checkAnswer(len); 
})
function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
},100)};
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(level===(currentLevel+1)){
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("fail");
        var audio1=new Audio("./sounds/wrong.mp3"); 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
function startOver(){
    level=0;
    gamePattern=[];
    started=true;
    userClickedPattern=[];
}



