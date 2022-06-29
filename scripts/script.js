const APIprefix = 'https://mock-api.driven.com.br/api/v4/buzzquizz/' 


function createQuizz() {
    let quizzes = document.querySelector(".without-quizz"); // mudar class para .quizzes
    let createNewQuizz = document.querySelector(".your-created-quizzes");   // mudar class para .createNewQuizz

    quizzes.classList.add("none");
    createNewQuizz.classList.remove("none");
}