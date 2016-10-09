//might remove alt
var destinationsData = [
    { name: 'New York', X: 1175, Y: 260, triviaQuestion: 'There are over 840 miles of subway track in New York City.', correctAnswer: 'True' },
    { name: 'Pennsylvania', X: 1060, Y: 300, triviaQuestion: 'Hershey, PA is nicknamed "The Sweetest Place On Earth"', correctAnswer: 'True' },
    { name: 'Ohio', X: 1000, Y: 330, triviaQuestion: 'Cleveland was the first city in the world to have a public school system.', correctAnswer: 'False', alt: 'Become lighted electrically' },
    { name: 'Indiana', X: 925, Y: 330, triviaQuestion: 'Santa Claus,IN receives over a half million letters and requests at Christmastime', correctAnswer: 'True' },
    { name: 'Illinois', X: 860, Y: 330, triviaQuestion: '"Twerking" is the official state dance of Illinois.', correctAnswer: 'False', alt: 'Square dance' },
    { name: 'Iowa', X: 755, Y: 300, triviaQuestion: 'The "Honeycrisp" variety of apple originated in Peru, Iowa', correctAnswer: 'False', alt: 'Red Delicious apple' },
    { name: 'Nebraska', X: 600, Y: 325, triviaQuestion: 'The Nebraska National Forest is the largest hand-planted forest in America.', correctAnswer: 'True'},
    { name: 'Wyoming', X: 450, Y: 300, triviaQuestion: 'The majority of The Grand Canyon is in Wyoming', correctAnswer: 'False', alt: 'Yellowstone National Park'},
    { name: 'Utah', X: 320, Y: 330, triviaQuestion: 'The inventor of the television was born in Beaver, UT', correctAnswer: 'True'},
    { name: 'Nevada', X: 230, Y: 330, triviaQuestion: 'Las Vegas has over 300,000 hotel rooms', correctAnswer: 'False', alt: '150,000 - still more than any city on earth'},
    { name: 'California', X: 150, Y: 430, triviaQuestion: 'California is home to the highest and lowest points in the continental U.S.', correctAnswer: 'True'}
];

//make a copy of destinationsData to work with the data called destinations
var destinations = destinationsData.slice(0);
//other global variables to for reuse
var currentStop;
var moveSpeed = 1000; // 1sec
var timeToAnswer = 5000; //5sec
var answerTimer;


function go() {
    if (destinations) {
        currentStop = destinations.shift();

        if (currentStop) {
            //moves car to currentStop based on x,y coords
            $('#car').animate({ left: currentStop.X + 'px', top: currentStop.Y + 'px' }, moveSpeed);

            // Schedule question after move animation is over
            setTimeout(function () {
                askQuestion(currentStop);
            }, moveSpeed);

            // Schedule check answer after move animation is complete and timeToAnswer has expired
            answerTimer = setTimeout(function () {
                checkAnswer('timer');
            }, timeToAnswer + moveSpeed);
        }
    }
}

function askQuestion(destination) {
    displayGameState('#trivia');
    $('.trivia').text(destination.triviaQuestion);

    //start + display timer
    initializeTimer('#timer', timeToAnswer);
}


//displays game state to player based on different states of game 
function displayGameState(selector){
    //hide all 
    $('.gameState').hide();
    //display selector
    $(selector).show();
}


//checks answer and takes parameter of 'who' is using it
function checkAnswer(source) {
    var answer = $('input:radio[name=answer]:checked').val();

    if (answer === currentStop.correctAnswer) {
        // move to next
        go();
    }
    else {
        if (source === 'timer'){
         displayGameState('#timesUp');
        }
        else {
         displayGameState('#wrongAnswer');
        }
    }
}


//this creates the timer
function initializeTimer(id, duration) {
    var timer = $(id);
    var remainingSeconds = Math.floor((duration / 1000) % 60);

    // display timer
    if (remainingSeconds > 0) {
        timer.text('Time Left: ' + remainingSeconds);
        remainingSeconds--;
    }

    // schedule timer updates
    if (remainingSeconds > 0) {
        var timeinterval = setInterval(function () {
            timer.text('Time Left: ' + remainingSeconds);
            remainingSeconds--;
            if (remainingSeconds <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
    }
}



$(function () {
    //event listener for submit button for checkAnswer function and clear timer
    $('#triviaModal button').on('click', function () {
        clearTimeout(answerTimer);
        checkAnswer('button');
    });

    go();

    //$('#dialog').dialog({ autoOpen: false});

    //$("button").on("click", function(){
    //	$('#dialog').dialog('open');
    //});

});


        //ask player if they want to play again (input)

