async function fetchQuestions() {
    const response = await fetch('questions.json', { method: 'GET' });
    const questions = await response.json();
    return questions;
}

function renderSubmitButton(){
    const questionsDiv = document.getElementById('questions');
    const submitButton = document.createElement('button');
    submitButton.textContent = "SUBMIT";
    submitButton.setAttribute("id", "submitButton");
    submitButton.addEventListener('click', printScore);
    questionsDiv.appendChild(submitButton);
}

function renderNextButton(nextIndex) {
    const questionsDiv = document.getElementById('questions');
    const nextButton = document.createElement('button');
    nextButton.textContent = "NEXT";
    nextButton.setAttribute("id", "nextButton");
    nextButton.addEventListener('click', (e) => displayQuestion(nextIndex));
    if (nextIndex == QUESTIONS.length) {
        nextButton.style.display = "none";
        // TODO
        //create submit button and call printScore inside button
        renderSubmitButton();
        // printScore();
    }
    questionsDiv.appendChild(nextButton);
}

function renderPreviousButton(prevIndex) {
    const questionsDiv = document.getElementById('questions');
    const prevButton = document.createElement('button');
    prevButton.textContent = "PREV";
    prevButton.setAttribute("id", "prevButton");
    prevButton.addEventListener('click', (e) => displayQuestion(prevIndex));
    if (prevIndex < 0) {
        prevButton.disabled = true;
    }
    questionsDiv.appendChild(prevButton);
}

function printScore() {
    clearTimeout(timex);
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ""; //cleanup
    questionsDiv.textContent = `SCORE: ${SCORE}/10`;
    
    renderRestartButton();
}

function renderRestartButton() {
    const questionsDiv = document.getElementById('questions');
    const restartButton = document.createElement('button');
    restartButton.textContent = "RESTART";
    restartButton.setAttribute("id", "restartButton");
    restartButton.addEventListener('click', (e) => location.reload());
    questionsDiv.appendChild(restartButton);
}

function displayQuestion(index) {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ""; //cleanup

    const question = QUESTIONS[index];
    //create block
    const newBlock = document.createElement('div');
    newBlock.setAttribute("id", `question${index}`)
    newBlock.innerHTML = `<h3>${question.question}</h3><span>Points: ${question.points}</span><table><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[0].name}">${question.options[0].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[1].name}">${question.options[1].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[2].name}">${question.options[2].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[3].name}">${question.options[3].name}</td></tr></table>`;
    questionsDiv.appendChild(newBlock);
    renderPreviousButton(index - 1);
    renderNextButton(index + 1);
    renderRestartButton();

}

function start() {
    startTimer();
    document.getElementById("start").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    fetchQuestions().then((response) => {
        QUESTIONS = response;
        displayQuestion(0);

    }
    );
}

function startTimer() {
    timex = setTimeout(() => {
        seconds++;
        if (seconds > 59) {
            seconds = 0; mins++;
            if (mins < 10) {
                document.getElementById("mins").textContent = ('0' + mins + ':');
            }
            else document.getElementById("mins").textContent = (mins + ':');
        }
        if (seconds < 10) {
            document.getElementById("seconds").textContent = `0${seconds}`;
        } else {
            document.getElementById("seconds").textContent = seconds.toString();
        }

        startTimer();
    }, 1000);
}

let QUESTIONS = [];
let SCORE = 0;
let answers = [];
let seconds = 0;
let minutes = 0;
let timex;