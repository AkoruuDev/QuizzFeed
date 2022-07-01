let allQuizzes = [];

const APIprefix = 'https://mock-api.driven.com.br/api/v7/buzzquizz/'

let allQuizzesPromise = axios.get(`${APIprefix}quizzes`);
allQuizzesPromise.then(getAllQuizzes);
allQuizzesPromise.catch(connectionError);

function getAllQuizzes(response) {
    allQuizzes = response.data;
    console.log(allQuizzes);
    renderizeAllQuizzes();
}

function connectionError(response) {
    alert("Deu erro, iremos reiniciar a página!");
    window.location.reload();
}

function renderizeAllQuizzes() {
    const allQuizzesContainer = document.querySelector('.all-quizzes-container');
    allQuizzesContainer.innerHTML += "";
}

function createQuizz() { // Criar novo quizz
    let pageOff = document.querySelector(".quizzes");
    let pageOn = document.querySelector(".newQuizz");
    pageOff.classList.add("none");
    pageOn.classList.remove("none");
}

function goToCreateQuestions() { // Ir para criação de questões
    const pageOff = document.querySelector(".basicsInfo");
    const pageOn = document.querySelector(".questionsNewQuizz");
    const takes = document.querySelectorAll(".basicsInfo-content");

    const title = takes[0].value;
    const URLnq = takes[1].value;
    const QuantAsks = Number(takes[2].value);
    const quantLevel = Number(takes[3].value);

    console.log(title);
    console.log(URLnq);
    console.log(QuantAsks);
    console.log(quantLevel);

    let next = checkFieldsOnCreateQuestions(title, URLnq, QuantAsks, quantLevel);
    if (next) {
        pageOff.classList.add("none");
        pageOn.classList.remove("none");
    }
}

function checkFieldsOnCreateQuestions(title, URLnq, QuantAsks, quantLevel) { // Tratamento de erros para criação de novo quizz - Informações básicas
    let retTitle = false;
    let retURLnq = false;
    let retQuantAsks = false;
    let retQuantLevel = false;
    let pos;

    if (title.length >= 20 && title.length <= 36) {
        retTitle = true;
        pos = 0;
        checkErroInfoBasics(pos);

        console.log(retTitle);
    } else {
        pos = 0;
        showErroInfoBasics(pos);
    }
    try {
        let URLver = new URL(URLnq);
        retURLnq = true;
        pos = 1;
        checkErroInfoBasics(pos);

        console.log(retURLnq);
    } catch (err) {
        pos = 1;
        showErroInfoBasics(pos);
    }
    if (QuantAsks >= 3) {
        retQuantAsks = true;
        pos = 2;
        checkErroInfoBasics(pos);

        console.log(retQuantAsks);
    } else {
        pos = 2;
        showErroInfoBasics(pos);
    }
    if (quantLevel >= 2) {
        retQuantLevel = true;
        pos = 3;
        checkErroInfoBasics(pos);

        console.log(retQuantLevel);
    } else {
        pos = 3;
        showErroInfoBasics(pos);
    }

    return retTitle && retURLnq && retQuantAsks && retQuantLevel;
}

function showErroInfoBasics(pos) { // Tratamento de erros para criação de novo quizz - Informações básicas
    let error = document.querySelectorAll(".createNewQuizz .basicsInfo .content .error");

    error[pos].classList.remove("none");
}

function checkErroInfoBasics(pos) { // Tratamento de erros para criação de novo quizz - Informações básicas
    let error = document.querySelectorAll(".createNewQuizz .basicsInfo .content .error");

    if (!error[pos].classList.contains("none")) {
        error[pos].classList.add("none");
    }
}

// let oneQuizzPromise = axios.get(`${APIprefix}quizzes/`);
// oneQuizzPromise.then(getOneQuizz);
// oneQuizzPromise.catch(connectionError);

function getOneQuizz(element) { // Começar quizz
    //create class for one quizz
    //change inner.html
    console.log(element);
    let allPage = document.querySelector('.quizzes');
    let quizzSelected = document.querySelector('.quizz-selected')
    console.log(quizzSelected);
    allPage.classList.add("none");
    quizzSelected.classList.remove('none');
    
    quizzSelected.innerHTML += `<div class="quizz-banner">
    <img src="./images/test.jpg" alt="">
    <p class="quizz-question">O quão potterhead é voce?</p>
</div>`

    //esse número 4 corresponde a quantidade de perguntas requisitadas
    for (let i = 0; i < 4; i++) {
        quizzSelected.innerHTML += `<section class="selected-content">
        <div class="quizz-selected-container">
            <div class="question-container">
                <div class="question-container-title">
                    <p>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</p>
                </div>
                <div class="question-img-container">
                    <div>
                        <img src="./images/test.jpg" alt="" class="question-img">
                        <p class="answer">teste</p>
                    </div>
                    <div>
                        <img src="./images/test.jpg" alt="" class="question-img">
                        <p class="answer">teste</p>
                    </div>
                    <div>
                        <img src="./images/test.jpg" alt="" class="question-img">
                        <p class="answer">teste</p>
                    </div>
                    <div>
                        <img src="./images/test.jpg" alt="" class="question-img">
                        <p class="answer">teste</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`    
    }


    quizzSelected.innerHTML += `<section class="selected-content">
    <div class="quizz-selected-container">
    <div class="result">
                        <div>
                            <h1 class="result-title">88% de acerto: Você é praticamente um aluno de Hogwarts!</h1>
                            <img src="./images/test.jpg" alt="" class="result-img">
                            <p class="final-message">
                                Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique
                                no botão abaixo para usar o vira-tempo e reiniciar este teste.
                            </p>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="restart-quizz">
                            Reiniciar quizz
                        </button>
                        <button class="back-home">
                            Voltar para Home
                        </button>
                    </div>
                </div>
            </section>`;
}




function getQuizzID() {

}

function renderizeSelectedQuizz() {

}







