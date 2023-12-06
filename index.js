var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).on("keydown", function () { 
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text(`Level: ${level}`);
        nextSequence();
    }
});


$(".btn").on("click", function(event) { 
    var userChosenButton = event.target;
    var userChosenColour = event.target.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenButton);
    
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence() { 
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];

    userClickedPattern = [];

    $("h1").text(`Level: ${level}`);
    level++;

    gamePattern.push(randomChosenColour);

    gamePattern.forEach(function (element, index) {
        var hasClicked = false;
        $(".btn").on("click", function() {
            hasClicked = true;
        })
        setTimeout(function() {
            animateSequence(element);
            if (index === gamePattern.length - 1) {
                console.log("Sequence Complete");
            }
            if (hasClicked) {
                hasClicked = false;
                gameOver();
            }
        }, index * 750);
    });
}

function animateSequence (sequence) {
    playSound(sequence);
    $("#" + sequence).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}


function animatePress (currentColour) { 
    $(currentColour).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 100);
}

function playSound (name) {
    var currentSound = new Audio(`./sounds/${name}.mp3`);
    currentSound.play();
}

function gameOver() {
    var currentSound = new Audio("./sounds/wrong.mp3");
    currentSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game Over! Press Any Key To Restart.")

    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function checkAnswer(currentLevel) {
    console.log(userClickedPattern[currentLevel] + "/" + gamePattern[currentLevel]);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success!");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}
