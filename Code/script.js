 var destination = [
     {name: 'New York', X:1175, Y: 260, triviaQuestion: 'How many total miles of subway track does New York City have?', correctAnswer: '846'},
     {name: 'Pennsylvania', X: 1060, Y: 296, triviaQuestion: 'Which PA city is nicknamed "The Sweetest Place On Earth?"', correctAnswer: 'Hershey'}    
     ];


function drive(){
// animate moving Car to Destination coords 
 $('#car').animate({right: '100px'}, 1000);
//asks a trivia question - use a modal
//runs a timer - if time runs out, back to start
//if timer doesnt expire, check answer to question
//if answer is correct, move car to next Destination coords
//if answer is incorrect, back to start
// if it is last Destination 
//display winning message
//ask player if they want to play again (input)
    
}

drive();