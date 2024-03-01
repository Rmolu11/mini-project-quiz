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


//variables to get a hold of the questions and the answers
var questionEl = document.getElementById("question-answer");
var answerEl = document.getElementById("btn-answer");
var introPage = document.getElementById("intro-page");


var currentQuestionIndex = 0; // questions are stored in array. It's best to start at 0
var playerScore = 0; // initiallize score to 0

function startQuiz(){
    //reset question
    var currentQuestionIndex = 0;
    //reset score
    var playerScore = 0;
    //display question
    questionEl.classList.remove("hidden");
    //hide intro page
    introPage.classList.add("hidden");
    startTimer();
    showNextQuestion();
}


function startTimer(){

}

function showNextQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    //display question
    questionEl.innerHTML = currentQuestion.question;
    //display answers
}