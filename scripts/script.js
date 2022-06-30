let allQuizzes = [];

const APIprefix = 'https://mock-api.driven.com.br/api/v4/buzzquizz/' 

let allQuizzesPromise = axios.get(`${APIprefix}quizzes`);
allQuizzesPromise.then(getAllQuizzes);
allQuizzesPromise.catch(connectionError);


function getAllQuizzes(response){
    allQuizzes = allQuizzes.data;
    console.log(response.data);
}

function connectionError(response){
    alert("Deu erro, iremos reiniciar a página!");
    window.location.reload();
}

function createQuizz() {
    let quizzes = document.querySelector(".quizzes");
    let createNewQuizz = document.querySelector(".newQuizz");
    quizzes.classList.add("none");
    createNewQuizz.classList.remove("none");
}
