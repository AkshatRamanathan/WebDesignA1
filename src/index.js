async function fetchQuestions() {
    const response = await fetch('questions.json', { method: 'GET' });
    const questions = await response.json();
    // console.log(questions);
    return questions;
}

function cleanup() {
    //cleanup
    const questionsDiv = document.getElementById('questions');
    // questionsDiv.innerHTML="";
}

function displayQuestion(question) {
    cleanup();
    const questionsDiv = document.getElementById('questions');
    //create block
    const newBlock = document.createElement('div');
    newBlock.setAttribute("id", `question${question._id}`)
    newBlock.innerHTML = `<h3>${question.question}</h3><span>Points: ${question.points}</span><table><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[0].name}">${question.options[0].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[1].name}">${question.options[1].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[2].name}">${question.options[2].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[3].name}">${question.options[3].name}</td></tr></table>`;
    questionsDiv.appendChild(newBlock);
}

function handleSubmit(){
    document.getElementById('questions').innerHTML="";

}

function submitButtonAction(){
    const questionsDiv = document.getElementById('questions');
    const submitButton = document.createElement('button');
    submitButton.textContent = "SUBMIT";
    submitButton.setAttribute("id","submitButton");
    submitButton.addEventListener('click',handleSubmit);
    questionsDiv.appendChild(submitButton);
}

async function start() {
    //hide start button 
    document.getElementById("start").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    //get questions
    QUESTIONS = await fetchQuestions();
    QUESTIONS.forEach(question => displayQuestion(question));
    submitButtonAction();
}
let QUESTIONS = [];
let SCORE = 0;
let answers = [];