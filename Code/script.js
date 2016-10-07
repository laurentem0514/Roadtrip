var destinations = [
    { name: 'New York', X: 1175, Y: 260, triviaQuestion: 'How many total miles of subway track does New York City have?', correctAnswer: '846' },
    { name: 'Pennsylvania', X: 1060, Y: 300, triviaQuestion: 'Which PA city is nicknamed "The Sweetest Place On Earth?"', correctAnswer: 'Hershey' },
    { name: 'Ohio', X: 1000, Y: 330, triviaQuestion: 'Cleveland was the first city in the world to do which of the following?', correctAnswer: 'Become lighted electrically' },
    { name: 'Indiana', X: 925, Y: 330, triviaQuestion: 'Santa Claus,IN receives over a half million letters and requests at Christmastime', correctAnswer: 'True' },
    { name: 'Illinois', X: 860, Y: 330, triviaQuestion: 'What is the official state dance of Illinois?', correctAnswer: 'Square dance' },
    { name: 'Iowa', X: 755, Y: 300, triviaQuestion: 'Which popular variety of apple originated in Peru, Iowa?', correctAnswer: 'Red Delicious' },
    { name: 'Nebraska', X: 600, Y: 325, triviaQuestion: 'Of these, what is unique about the Nebraska National Forest?', correctAnswer: 'it is the largest hand-planted in America' }
];


function drive() {

    // animate car from right to left using coords 
    var destination = destinations[0];
    $('#car').animate({ right: destination.X + 'px' }, 1000);
    console.log("Welcome to " + destination.name);

    //destinationQ&A load into modal and show modal
    $('.trivia').text(destination.triviaQuestion);
    $('#triviaModal').dialog('open');


}



function start() {
    //for each item in destination:
    for (var i = 0; i < destinations.length; i++) {



        setTimeout(function () {
            var destination = destinations[i];
            drive(i);

        }, 2000);

        //asks a trivia question - use a modal

        //runs a timer - if time runs out, back to start
        //if timer doesnt expire, check answer to question
        //if answer is correct, move car to next Destination coords
        //if answer is incorrect, back to start
        // if it is last Destination 
        //display winning message
        //ask player if they want to play again (input)

    }
}

$(function () {
    console.log("ready!");
    drive();
    $('#triviaModal').dialog({
         autoOpen: false
    });

});
