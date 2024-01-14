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
    //create block
    const newBlock = document.createElement('div');
    newBlock.setAttribute("id", `question${question._id}`)
    newBlock.innerHTML = `<h3>${question.question}</h3><span>Points: ${question.points}</span><table><tr><td>${question.options[0]}</td></tr><tr><td>${question.options[1]}</td></tr><tr><td>${question.options[2]}</td></tr><tr><td>${question.options[3]}</td></tr></table>`;
    questionsDiv.appendChild(newBlock);
}
async function start() {
    //hide start button 
    document.getElementById("start").style.display = "none";
    //get questions
    const QUESTIONS = await fetchQuestions();
    QUESTIONS.forEach(question => displayQuestion(question));

    //on next click, change question div
    //on end, display score and restart button
}