async function fetchQuestions(){
    const response = await fetch('/questions.json');
    const questions = await response.json();
    // console.log(questions);
    return questions;
}

async function start(){
    //remove button and replace with question div
    document.getElementById("start").style.display = "none";
    const questionsDiv = document.getElementById('questions');
    const QUESTIONS = await fetchQuestions();    
    for( let question of QUESTIONS){
        // console.log(question);
        questionDivMaker(question);
    }

    //on next click, change question div
    //on end, display score and restart button
}