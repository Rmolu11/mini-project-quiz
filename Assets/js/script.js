// creating an object called questions which contains an array of question objects
// each question contains an array of answers
//each answer object has a text property and a correct property
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        //array of answer objects containint text property and boolean correctness property
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alert", correct: true },
            { text: "numbers", correct: false }

        ]
    },
    {
        question: "The condition in an if/else statemnt is enclosed within ____.",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: true },
            { text: "square brackets", correct: false }
        ]
    },
    {
        question: "Arays in JavaScript can be used to store ___.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debbuger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console log", coorrect: true },
        ]
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
var playerScore;
var timeLeft = 60;
var TimeId;

startButton.addEventListener("click", startQuiz);

var currentQuestionIndex = 0; // questions are stored in array. It's best to start at 0

function startQuiz(){
    var playerScore = 0; // initiallize score to 0
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
        answerButton.innerHTML = (i+1)+ "." + answer.text;
        answerButton.classList.add("button");

        answerButton.addEventListener("click", function(event){
            chooseAnswer(event);
        });

        answerButtons.appendChild(answerButton);
    }

    answerButtons.classList.remove("hidden");


}

function chooseAnswer(event){
    var chosenButton = event.target;
    var answers = questions[currentQuestionIndex].answers;
    // using the find() method on arrays to return the first element that matches the condition
    var correctAnswer = answers.find(function(answer){ 
        return answer.correct;
    });

    if (chosenButton.innerText === correctAnswer.innerText){
        playerScore += 10;
    } else {
        timeLeft -= 10;
    }

    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        stopQuiz();
    }
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
            document.getElementById("results-heading").innerHTML = "Good Job, " + userInitials + " you're all done! Your final score is: " + playerScore;
            resultEl.classList.remove("hidden");
        } else {
            alert("Please input your initials");
        }
    }

}