const APIprefix = 'https://mock-api.driven.com.br/api/v4/buzzquizz/' 


function createQuizz() {
    let quizzes = document.querySelector(".quizzes");
    let createNewQuizz = document.querySelector(".newQuizz");
    quizzes.classList.add("none");
    createNewQuizz.classList.remove("none");
}