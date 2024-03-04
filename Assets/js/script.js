// creating an object called questions which contains an array of question objects with properties: question, answer and solution
// each answer array is a string of choices
//each question has a property called solution displaying the right answer 

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alert", "numbers"],
        solution: "alert" 
    },
    {
        question: "The condition in an if/else statemnt is enclosed within ____.",
        answers: [ "quotes", "curly brackets", "parentheses", "square brackets"],
        solution: "parentheses" 
    },
    {
        question: "Arays in JavaScript can be used to store ___.",
        answers: [ "numbers and strings", "other arrays", "booleans", "all of the above"],
        solution: "all of the above" 
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables",
        answers: [ "commas", "curly brackets", "quotes", "parentheses"],
        solution: "quotes" 
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debbuger is:",
        answers: [ "JavaScript", "terminal/bash", "for loops", "console log"],
        solution: "console log" 
    }
];


//variables to get a hold of HTML elements
var questionEl = document.getElementById("question");
var questionContainer = document.getElementById("question-container");
var answerEl = document.getElementById("btn-answer");
var startButton = document.getElementById("btn-start-quiz");
var introPage = document.getElementById("intro-page");
var timerEl = document.getElementById("timer");
var answerButtons = document.getElementById("answer-options");
var resultEl = document.getElementById("results");
var leaderBoardEl = document.getElementById("leaderboard");    
var resetButton = document.getElementById("reset-leaderboard");
var playerScore;
var timeLeft = 60;
var timerId;

startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetLeaderBoard);

var currentQuestionIndex = 0; // questions are stored in array. It's best to start at 0

function startQuiz(){
    playerScore = 0; // initiallize score to 0
    currentQuestionIndex = 0
    questionContainer.classList.remove("hidden");
    introPage.classList.add("hidden");
    startTimer();
    console.log("you started the quiz");
    showQuestion();
}


function startTimer(){
    timerEl.textContent = "Timer: "+ timeLeft;
    timerId = setInterval(function(){
        timeLeft--;
        timerEl.textContent = "Timer: "+ timeLeft;
        if (timeLeft <= 0){
            clearInterval(timerId);
            stopQuiz();
        }
    },1000);

}

function showQuestion(){
    answerButtons.innerHTML = "";
    questionEl.innerHTML = questions[currentQuestionIndex].question;

    for(var i = 0; i<questions[currentQuestionIndex].answers.length; i++){
        var answerButton = document.createElement("button");
        var answer = questions[currentQuestionIndex].answers[i];
        answerButton.innerHTML = questions[currentQuestionIndex].answers[i];
        answerButton.classList.add("button");

        answerButton.addEventListener("click", function(event){
            chooseAnswer(event);
        });

        answerButtons.appendChild(answerButton);
    }

    answerButtons.classList.remove("hidden");


}

function chooseAnswer(event){
    var chosenButton = event.target.textContent;
    var answers = questions[currentQuestionIndex].solution;
    console.log(chosenButton);
    //using the find() method on arrays to return the first element that matches the condition
    // var correctAnswer = answers.find(function(answer){ 
    //     return answer.correct;
    // });


    if (chosenButton === answers){
        playerScore += 10;
        console.log("correct");
    // if (chosenButton.innerText === correctAnswerString){
    //         playerScore += 10;
    } else {
        timeLeft -= 10;
        console.log("incorrect")
    }

    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        stopQuiz();
    }
}

function updateLeaderboard(scores){
    leaderBoardEl.innerHTML = "";

    for(var i = 0; i < scores.length; i++){
        var score = scores[i];
        var scoreEntry = document.createElement("div");
        scoreEntry.classList.add("leaderboard-entry");
        scoreEntry.textContent = (i+1) + ". " + score.initials + ". " + score.score;
        leaderBoardEl.appendChild(scoreEntry);
    }
    leaderBoardEl.classList.remove("hidden");
}

function resetLeaderBoard(){
    
    
}

function stopQuiz(){
    clearInterval(timerId);
    //stop displaying the questions
    questionContainer.classList.add("hidden");

    //initials box
    document.getElementById("all-done").classList.remove("hidden");
    var submitBtn = document.getElementById("submit-btn");
    var userInitialsInput = document.getElementById("user-initials");

    submitBtn.onclick = function() {
        var userInitials = userInitialsInput.value;
        //check that the user enters their initials
        if (userInitials){
            var newScore = {
                initials: userInitials,
                score: playerScore,
            }
            // create an array for leaderboards. If its null, it will return and empty array
            var scores = JSON.parse(localStorage.getItem("leaderBoardScores")) || [];

            // since leaderboard is an array, push() method works
            scores.push(newScore);
            localStorage.setItem("leaderBoardScores", JSON.stringify(scores));

            updateLeaderboard(scores);

            document.getElementById("results-heading").innerHTML = "Good Job, " + userInitials + " you're all done! Your final score is: " + playerScore;
            resultEl.classList.remove("hidden");
        } else {
            alert("Please input your initials");
        }
    }

}

