/*Pseudocode for the game:
Set up the canvas
Set score to zero
Create snake
Create apple
Every 100 milliseconds {
 Clear the canvas
 Draw current score on the screen
 Move snake in current direction
 If snake collides with wall or itself {
 End the game
 } Else If snake eats an apple {
 Add one to score
 Move apple to new location
 Make snake longer
 }
 For each segment of the snake {
 Draw the segment
 }
 Draw apple
 Draw border
}
When the user presses a key {
 If the key is an arrow {
 Update the direction of the snake
 }
*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var pickWord = function () {
    var words = [
        "prince",
        "flower",
        "kama",
        "beef"
    ];

    return words[Math.floor(Math.random() * words.length)];
};

var setupAnswerArray = function (word) {
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }

    return answerArray;
};

var showPlayerProgress = function (answerArray) {
    alert(answerArray.join(" "));
};

var getGuess = function () {
    return prompt("Guess a letter, or click Cancel to stop playing.");
};

var updateGameState = function (guess, word, answerArray) {
    var appearances = 0;
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
            answerArray[j] = guess;
            drawCorrectGuess(guess, j);
            appearances++;
        }
    }

    return appearances;
};

var showAnswerAndCongratulatePlayer = function (answerArray) {
    showPlayerProgress(answerArray);
    alert("Good job! The answer was " + answerArray.join(""));
};

var drawSegment = function (incorrectGuesses) {
    ctx.lineWidth = 4;

    if (incorrectGuesses === 0) {
        ctx.strokeRect(20, 20, 20, 20);
    } else if (incorrectGuesses === 1) {
        ctx.beginPath();
        ctx.moveTo(30, 40);
        ctx.lineTo(30, 80);
        ctx.stroke();
    } else if (incorrectGuesses === 2) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(10, 110);
        ctx.stroke();
    } else if (incorrectGuesses === 3) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(50, 110);
        ctx.stroke();
    } else if (incorrectGuesses === 4) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(10, 50);
        ctx.stroke();
    } else if (incorrectGuesses === 5) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(50, 50);
        ctx.stroke();
    }
};

// Draw the underscores for the guesses
var drawUnderscores = function (howMany) {
    ctx.lineWidth = 4;
    ctx.beginPath();

    for (var i = 0; i < howMany; i++) {
        ctx.moveTo((i * 30) + 10, 160);
        ctx.lineTo((i * 30) + 30, 160);
    }

    ctx.stroke();
};

// Draw the correct guess in the appropriate position
var drawCorrectGuess = function (guess, index) {
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(guess.toUpperCase(), (index * 30) + 10, 150);
};

// Draw the incorrect guess with a line through it in the appropriate position
var drawIncorrectGuess = function (guess, index) {
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(guess.toUpperCase(), 380, (index * 20) + 40);
    ctx.moveTo(380, (index * 20) + 30);
    ctx.lineTo(400, (index * 20) + 30);
    ctx.stroke();
};

var word = pickWord();
var answerArray = setupAnswerArray(word);
var remainingLetters = word.length;
var incorrectGuesses = 0;

drawUnderscores(word.length);

while (remainingLetters > 0) {
    showPlayerProgress(answerArray); var guess = getGuess();
    if (guess === null) {
        break;
    } else if (guess.length !== 1) {
        alert("Please enter a single letter.");
    } else {
        var correctGuesses = updateGameState(guess, word, answerArray);

        remainingLetters -= correctGuesses;

        if (correctGuesses === 0) {
            drawSegment(incorrectGuesses);
            drawIncorrectGuess(guess, incorrectGuesses);
            incorrectGuesses++;
        }
    }
}

showAnswerAndCongratulatePlayer(answerArray);
