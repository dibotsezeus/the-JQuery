var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// function for the user chosen color patterns

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);

    checkAnswer(userPattern.length - 1);

    playSound(userChosenColor); //playSound function callback
    animatePress(userChosenColor);
});

// function for the animation

function animatePress(currentColor) {
    //var currentColor = this.attr('class');
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



// function for the game pattern, animations and sounds

function playSound(name) {
    // switch (name) {
    //     case 'green':
    //         var greenSound = new Audio('sounds/green.mp3');
    //         greenSound.play();
    //         break;
    //     case 'red':
    //         var redSound = new Audio('sounds/red.mp3');
    //         redSound.play();
    //         break;
    //     case 'yellow':
    //         var yellowSound = new Audio('sounds/yellow.mp3');
    //         yellowSound.play();
    //         break;
    //     case 'blue':
    //         var blueSound = new Audio('sounds/blue.mp3');
    //         blueSound.play();
    //         break;
    //     default: null;
    // }

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// using jquery to detect a button press and call up the nextSequence function
var firstTimePress = false;
$(document).keypress(function () {
    if (firstTimePress === false) {
        $("h1").text(`level ${levels}`);
        nextSequence();
        firstTimePress = true;
    }
});


// check answer function

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            // console.log("success ");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
    }
    
}

// start over function
function startOver() {
    levels = 0;
    firstTimePress = false;
    gamePattern = [];
}

// main function
var levels = 0;  // number of levels
function nextSequence() {

    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); //playSound function callback

    levels++;
    // var increment = function (){
    //     levels++;
    // }
    $("h1").text(`level ${levels}`); // changing the innerHTML of the game when the game starts 
}

