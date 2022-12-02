var data;
var score = 0;
var input = "";
const pattern = "38384040373937396665"; // Suite de keycodes du konami code
// Konami code: [Up][Up][Down][Down][Left][Right][Left][Right][B][A]
var alreadyAnswered = false;
var easterEgg;

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
        data.questions = data.questions.sort((a, b) => 0.5 - Math.random());
        generateQuiz();
    }
}


// Elements creation

function generateQuestion(nbOfResponses, questionIndex) {
    // Le quiz suit le schema suivant
    // div.main
    //      div.quiz-container
    //          div.question
    //          div.explanation

    // div.quiz-container
    let quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    quizContainer.style.zIndex = data.questions.length-questionIndex;
    document.querySelector('.main').appendChild(quizContainer)

    // div.question
    let question = document.createElement('div');
    question.className = 'question';
    quizContainer.appendChild(question);

    // div.explanation
    let explanation = document.createElement('div');
    explanation.className = 'explanation';
    quizContainer.appendChild(explanation);

    // Question title
    let questionTitle = document.createElement('h2');
    questionTitle.textContent = data.questions[questionIndex].question;
    questionTitle.className = 'question-title';
    question.appendChild(questionTitle);
    let explanationText = document.createElement('h2');
    explanationText.innerHTML = 'BONNE REPONSE';
    explanation.append(explanationText);
    let explanationDesc = document.createElement('p');
    explanationDesc.textContent = data.questions[questionIndex].desc;
    explanation.append(explanationDesc);
    let nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.className = 'next-question-btn';
    nextQuestionBtn.innerHTML = 'SUIVANT >';
    explanation.append(nextQuestionBtn);
    nextQuestionBtn.addEventListener("click", () => {
        nextQuestion(questionIndex);
    });

    // Images
    if (data.questions[questionIndex].img) {
        let imgContainer = document.createElement("div");
        question.appendChild(imgContainer);
        imgContainer.className = "img-container";

        let img = document.createElement("img");
        img.src = data.questions[questionIndex].img;
        img.className = "img"
        imgContainer.appendChild(img)
    }
    for (let i=0; i<nbOfResponses; i++)
    {
        let button = document.createElement("button");
        button.className = "quiz-button"
        button.textContent = data.questions[questionIndex].answers[i];
        button.repIndex = i;

        button.addEventListener("click", function() {checkAnswer(questionIndex, button)});
        question.appendChild(button);
    }
}

// Crée toute les questions et les integre (cachés) à la page
function generateQuiz() {
    data.questions.forEach((item, index) => generateQuestion(item.answers.length, index));
    document.querySelector(".info-background").style.zIndex = data.questions.length+1;
}

// Quiz controls

function nextQuestion(questionIndex) {
    // Alterne entre le glissement vers la gauche et vers la droite
    document.querySelector(`.main>div:nth-child(${questionIndex + 1})`).style.animation = questionIndex%2?"slideLeft 1s forwards":"slideRight 1s forwards"; 
    if (questionIndex == data.questions.length - 1) {
        document.querySelector('.end-screen').style.display = "block";
    } else {
        document.querySelector(`.main>div:nth-child(${questionIndex + 2})`).style.display = "block";
        alreadyAnswered = false;
    }
}

function checkAnswer(questionIndex, button) {
    if (!alreadyAnswered) {
        document.querySelector(`.main>div:nth-child(${questionIndex+1})>.explanation`).style.display = "block";
        if (button.repIndex == data.questions[questionIndex].rightAnswerIndex){
            document.querySelector(".score-text").textContent = `Score: ${++score}`;
            // La fenetre de resultat est à l'etat "reussi" par defaut
        } else {
            // Changement de la fenetre du resultat
            document.querySelector(`.main>div:nth-child(${questionIndex+1})>.explanation`).style.backgroundColor = "#db2612";
            document.querySelector(`.main>div:nth-child(${questionIndex+1})>.explanation>button`).style.backgroundColor = "#730b00";
            document.querySelector(`.main>div:nth-child(${questionIndex+1})>.explanation>h2`).innerHTML = 'CE N\'EST PAS LA BONNE REPONSE'; 
        }
    }
    alreadyAnswered = true;
}

//Button controls
document.querySelector(".help").addEventListener("click", () => {
    document.querySelector(".info-background").style.display = "block"
})

document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".info-background").style.display = "none"
})

loadJsonData();
getData();

function handleKeyboard(event) {
    
    input += event.keyCode;
    if (input == pattern)
        playSound();
    if (!(input.length < pattern.length && input == pattern.substr(0, input.length)))
        input = "";

}
  
document.addEventListener('keyup', handleKeyboard)

function playSound() {
    document.querySelector('.konami-background').style.display = "block";
    var audio = new Audio('/public/son/KonamiSound.mp3');
    audio.play();
    setTimeout(() => {
        document.querySelector('.konami-background').style.display = "none";
    }, 2000); // Reset de l'animation
}
