var data;
var currentQuestionId = 0;
var nbQuestion = 10;


// Data loading methods

function loadJsonData() {
    fetch('./public/data.json')
        .then((response) => response.json())
        .then((json) => { data = json });
}

function getData() {
    if (!data) {
        setTimeout(getData, 100);
    } else {
        generateQuiz();
    }
}


// Elements creation

function generateQuestion(nbOfResponses, display, questionIndex) {
    
    let question = document.createElement("div");
    question.className = "quiz-question";
    question.style.display = display;
    question.style.zIndex = --nbQuestion;
    
    let questionTitle = document.createElement("p");
    questionTitle.textContent = data.questions[currentQuestionId].question;
    questionTitle.className = "question";
    question.appendChild(questionTitle);
    
    for (let i=0; i<nbOfResponses; i++)
    {
        let button = document.createElement("button");
        button.className = "quiz-button"
        button.textContent = `Réponse ababababa ${i+1}`;
        button.repIndex = i;

        button.addEventListener("click", function() {checkAnswer(questionIndex, button)});
        question.appendChild(button);
    }
    
    document.querySelector("#quiz-container").appendChild(question);
}

function generateQuiz() {
    data.questions.forEach((item, index) => generateQuestion(item.answers.length, "block", index));
}

// Quiz controls

function nextQuestion() {
    document.querySelector(`#quiz-container div:nth-child(${currentQuestionId + 1})`).style.animation = "slide 1s forwards";
    document.querySelector(`#quiz-container div:nth-child(${++currentQuestionId + 1})`).style.display = "block";
}

function checkAnswer(questionIndex, button) {
    if (button.repIndex == data.questions[questionIndex].rightAnswerIndex)
        console.log("true");
    else
        console.log("false");  
    nextQuestion();       
}

loadJsonData();
getData();

