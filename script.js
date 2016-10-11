
var destinationsData = [
    { name: 'New York', X: 1029, Y: 210, triviaQuestion: 'There are over 840 miles of subway track in New York City.', correctAnswer: 'True', imageName: 'nyc.jpg' },
    { name: 'Pennsylvania', X: 940, Y: 243, triviaQuestion: 'Hershey, PA is nicknamed "The Sweetest Place On Earth"', correctAnswer: 'True', imageName: 'hersheypa.jpg' },
    { name: 'Ohio', X: 887, Y: 268, triviaQuestion: 'Cleveland was the first city in the world to have a public school system.', correctAnswer: 'False', imageName: 'clevelandoh.jpg' },
    { name: 'Indiana', X: 815, Y: 271, triviaQuestion: 'Santa Claus,IN receives over a half million letters and requests at Christmastime', correctAnswer: 'True', imageName: 'indiana.jpg' },
    { name: 'Illinois', X: 755, Y: 268, triviaQuestion: '"Twerking" is the official state dance of Illinois.', correctAnswer: 'False', imageName: 'illinois.jpg' },
    { name: 'Iowa', X: 674, Y: 250, triviaQuestion: 'The "Honeycrisp" variety of apple originated in Peru, Iowa', correctAnswer: 'False', imageName: 'iowa.jpg' },
    { name: 'Nebraska', X: 551, Y: 264, triviaQuestion: 'The Nebraska National Forest is the largest hand-planted forest in America.', correctAnswer: 'True', imageName: 'nebraska.jpg' },
    { name: 'Wyoming', X: 392, Y: 239, triviaQuestion: 'The majority of The Grand Canyon is in Wyoming', correctAnswer: 'False', imageName: 'wyoming.jpg' },
    { name: 'Utah', X: 296, Y: 279, triviaQuestion: 'The inventor of the television was born in Beaver, UT', correctAnswer: 'True', imageName: 'utah.jpg' },
    { name: 'Nevada', X: 200, Y: 284, triviaQuestion: 'Las Vegas has over 300,000 hotel rooms', correctAnswer: 'False', imageName: 'lasvegas.jpg' },
    { name: 'California', X: 138, Y: 368, triviaQuestion: 'California is home to the highest and lowest points in the continental U.S.', correctAnswer: 'True', imageName: 'california.jpeg' }
];

//make a copy of destinationsData to work with the data called destinations
var destinations = destinationsData.slice(0);
//other global variables for reuse
var currentStop;
var moveSpeed = 1000; // 1sec
var timeToAnswer = 10000; //10sec
var answerTimer;
var carOffsetX = -30;
var carOffsetY = -95;
var carInitialX = 1180;
var carInitialY = 111;


//main function for game logic
function go() {
    //if array isn't empty
    if (destinations) {
        //gets first item and removes it from collection
        currentStop = destinations.shift();

        if (currentStop) {
            //time to move car, close dialogs before we animate
            closeModal();

            //moves car to currentStop based on x,y coords and offset
            var x = currentStop.X + carOffsetX;
            var y = currentStop.Y + carOffsetY;
            $('.car').animate({ left: x + 'px', top: y + 'px' }, moveSpeed);

            // Schedule question after move animation is over 
            setTimeout(function () {
                askQuestion(currentStop);
            }, moveSpeed);

            // Schedule check answer after move animation is complete and timeToAnswer has expired
            answerTimer = setTimeout(function () {
                checkAnswer('timer');
            }, timeToAnswer + moveSpeed);
        }
        //else no more stops means player has won 
        else {
            displayGameState('#congrats');
        }
    }
}

//show modal, load question and image based on location, reset input, initialize timer
function askQuestion(destination) {
    showModal();
    displayGameState('#trivia');
    $('.trivia').text(destination.triviaQuestion);
    $('#trivia img').attr({ src: 'images/stops/' + destination.imageName, alt: destination.name });
    $('#trivia input[name="answer"]').prop('checked', false);

    //start + display timer
    initializeTimer('#timer', timeToAnswer);
}

//displays game state to player based on different states of game 
function displayGameState(selector) {
    //hide all 
    $('.gameState').hide();
    //display selector
    $(selector).show();
}

//checks answer and takes parameter of 'who' is using it
function checkAnswer(source) {
    //'read' true or false
    var answer = $('input:radio[name=answer]:checked').val();

    //check answer and change game state
    // move to next if correct
    if (currentStop && answer === currentStop.correctAnswer) {
        go();
    }
    // or you run out of time
    else {
        if (source === 'timer') {
            displayGameState('#timesUp');
        }
        //or you answered incorrectly
        else {
            displayGameState('#wrongAnswer');
        }
    }
}

//this creates the timer
function initializeTimer(nodeId, duration) {
    var node = $(nodeId);
    var remainingSeconds = Math.floor((duration / 1000) % 60);

    // display initial timer value
    if (remainingSeconds > 0) {
        node.text('Time Left: ' + remainingSeconds);
        remainingSeconds--;
    }

    // schedule timer updates every second 
    if (remainingSeconds > 0) {
        var timeinterval = setInterval(function () {
            node.text('Time Left: ' + remainingSeconds);
            remainingSeconds--;
            //stop updating timer if remaining seconds is 0
            if (remainingSeconds <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
    }
}

//open and close modal
function showModal() {
    $('#modal').dialog('open');
}

function closeModal() {
    $('#modal').dialog('close');
}

//create an object from query string for easy access to keys and values
function getQueryStringObject() {
    var queryString = window.location.search.substr(1).split('&');
    var data = {};

    // loop through array of key-value pairs and create a property for each
    for (var i = 0; i < queryString.length; i++) {
        var parts = queryString[i].split('=');
        if (parts.length === 2) {
            var key = parts[0];
            var value = parts[1];
            data[key] = value;
        }
    }

    return data;
}

//resets destinations, moves car back to starting position and closes modal...brings player back to initial game state
function restart() {
    destinations = destinationsData.slice(0);
    $('.car').animate({ left: carInitialX + 'px', top: carInitialY + 'px' }, moveSpeed);
    closeModal();
}

//on loading of DOM
$(function () {
    //initialize modal
    $('#modal').dialog({ autoOpen: false, modal: true, width: 600 });

    //begin to run 'go' function when ready button clicked
    $('#startGameButton').on('click', function () {
        go();
    });

    //event listener for submit button for checkAnswer function and clear timer
    $('#trivia button').on('click', function () {
        clearTimeout(answerTimer);
        checkAnswer('button');
    });

    //gets input from landing page and displays in header
    var queryString = getQueryStringObject();
    $('.player-name').text(queryString.name || 'Anonymous Player');

    //event listener for play again button
    $('button.restart').on('click', restart);
});


