let allQuizzes = [];

const APIprefix = 'https://mock-api.driven.com.br/api/v7/buzzquizz/'

let allQuizzesPromise = axios.get(`${APIprefix}quizzes`);
allQuizzesPromise.then(getAllQuizzes);
allQuizzesPromise.catch(connectionError);

function getAllQuizzes(response) {
    allQuizzes = response.data;
    renderizeAllQuizzes(allQuizzes);
    console.log (allQuizzes);
}

function connectionError(response) {
    alert("Deu erro, iremos reiniciar a página!");
    window.location.reload();
}

function renderizeAllQuizzes(allQuizzes) {
    const allQuizzesContainer = document.querySelector('.all-quizzes-container');
    allQuizzesContainer.innerHTML = "";
    let i = 0;

    while (i < allQuizzes.length) {
        allQuizzesContainer.innerHTML += `<div class="quizz-boxes" onclick="getOneQuizz(this)">
        <p class="quizz-id none">${allQuizzes[i].id}</p>
        <img src="${allQuizzes[i].image}" alt="Image">
        <div class="gradient"></div>
        <p class="title">${allQuizzes[i].title}</p>
        </div>`
        i++
    }
}

// Create New Quizz Area
let titleNewQuizz = "";
let URLNewQuizz = "";
let questionsNewQuizz = [];
let levelsNewQuizz = [];

function createQuizz() { // Criar novo quizz
    let pageOff = document.querySelector(".quizzes");
    let pageOn = document.querySelector(".newQuizz");
    pageOff.classList.add("none");
    pageOn.classList.remove("none");
}

function saveInfoBasicsNewQuizz() {
    const takes = document.querySelectorAll(".basicsInfo-content");
    
    titleNewQuizz = takes[0].value;
    URLNewQuizz = takes[1].value;

    const QuantAsks = Number(takes[2].value);
    const quantLevel = Number(takes[3].value);

    console.log(titleNewQuizz);
    console.log(URLNewQuizz);
    console.log(QuantAsks);
    console.log(quantLevel);

    let next = checkFieldsOnCreateQuestions(titleNewQuizz, URLNewQuizz, QuantAsks, quantLevel);
    goToCreateQuestions(next, QuantAsks, quantLevel);
}

function goToCreateQuestions(next, QuantAsks, quantLevel) { // Ir para criação de questões
    if (next) {
        createQuestionsArea(QuantAsks);
        createLevelsArea(quantLevel);

        const pageOff = document.querySelector(".basicsInfo");
        const pageOn = document.querySelector(".questionsNewQuizz");

        pageOff.classList.add("none");
        pageOn.classList.remove("none");
    }
}

function createQuestionsArea(QuantAsks) {
    const print = document.querySelector(".creatingNewQuestions .bas-content");
    print.innerHTML = ""

    for (let i = 1; i <= QuantAsks; i ++) {
        let messagePrint = `
            <li class="content closedFolder Question${i}" onclick="openQuestionSelected(this)">              
                <span class="closedQuestion">
                    <p class="areaTitle">Pergunta ${i}</p>
                    <ion-icon name="create-outline"></ion-icon> <!-- Create -->
                </span>
                <div class="questions none">
                    <input type="text" placeholder="Texto da pergunta" class="titleQuestion${i}">
                    <input type="text" placeholder="Cor de fundo da pergunta" class="colorQuestion${i}">
                    Resposta correta
                    <input type="text" placeholder="Resposta correta" class="rightQuestion${i}">
                    <input type="text" placeholder="URL da imagem" class="imageRightQuestion${i}">
                    Respostas incorretas
                    <input type="text" placeholder="Resposta incorreta 1" class="wrong1Question${i}">
                    <input type="text" placeholder="URL da imagem 1" class="URLwrong1Question${i}">
                    <input type="text" placeholder="Resposta incorreta 2" class="wrong2Question${i}">
                    <input type="text" placeholder="URL da imagem 2" class="URLwrong2Question${i}">
                    <input type="text" placeholder="Resposta incorreta 3" class="wrong3Question${i}">
                    <input type="text" placeholder="URL da imagem 3" class="URLwrong3Question${i}">
                </div>                           
            </li>
        `

        print.innerHTML += messagePrint;
    }
}

function saveQuestionsNewQuizz() {
    const allQuestions = document.querySelectorAll(".creatingNewQuestions .bas-content .content");
    for (let i = 1; i <= allQuestions.length; i ++) {
        let answersNewQuizz = [];
        answersNewQuizz.push({
            text: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .rightQuestion${i}`).value,
            image: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .imageRightQuestion${i}`).value,
            isCorrectAnswer: true
        })

        for(let c = 1; c < 4; c ++) {
            const wrongAsks = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .wrong${c}Question${i}`).value;
            if (wrongAsks != "") {
                answersNewQuizz.push({
                    text: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .wrong${c}Question${i}`).value,
                    image: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .wrong${c}Question${i}`).value,
                    isCorrectAnswer: false
                })
            }
        }

        questionsNewQuizz.push({
            title: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .titleQuestion${i}`).value,
            color: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .colorQuestion${i}`).value,
            answers: answersNewQuizz
        })
    }

    const pageOff = document.querySelector(".creatingNewQuestions");
    const pageOn = document.querySelector(".creatingLevels");

    pageOff.classList.add("none");
    pageOn.classList.remove("none");
}

function saveLevelsNewQuizz() {
    levelsNewQuizz.push({
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
    });
}

function saveNewQuizzOnAPI() {
    let newQuizzAPI = {
        title: titleNewQuizz,
        image: URLNewQuizz,
        questions: questionsNewQuizz,
        levels: levelsNewQuizz
    }

    console.log(newQuizzAPI);
}

function createLevelsArea(quantLevel) {
    const print = document.querySelector(".creatingLevels .bas-content");
    print.innerHTML = ""

    for (let i = 1; i <= quantLevel; i ++) {
        let messagePrint = `
            <li class="content closedFolder Level${i}" onclick="openLevelSelected(this)">              
                <span class="closedLevel">
                    <p class="areaTitle">Nível ${i}</p>
                    <ion-icon name="create-outline"></ion-icon> <!-- Create -->
                </span>
                <div class="Levels none">
                    <input type="text" placeholder="Título do nível">
                    <input type="text" placeholder="% de acerto mínima">
                    <input type="text" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
                </div>                           
            </li>
        `

        print.innerHTML += messagePrint;
    }
}

function openQuestionSelected(element) {
    checkOthersCheckboxQuestions();
    element.querySelector(".closedQuestion ion-icon").classList.add("none");
    element.querySelector(".questions").classList.remove("none");
    element.classList.remove("closedFolder");
}

function checkOthersCheckboxQuestions() {
    const qtd = document.querySelectorAll(".creatingNewQuestions .bas-content li").length;

    for (let i = 1; i <= qtd; i ++) {
        document.querySelector(`.Question${i} .closedQuestion ion-icon`).classList.remove("none");
        document.querySelector(`.Question${i} .questions`).classList.add("none");
        document.querySelector(`.Question${i}`).classList.add("closedFolder");
    }
}

function checkFieldsOnCreateQuestions(titleNewQuizz, URLNewQuizz, QuantAsks, quantLevel) { // Tratamento de erros para criação de novo quizz - Informações básicas
    let retTitle = false;
    let retURLnq = false;
    let retQuantAsks = false;
    let retQuantLevel = false;
    let pos;

    if (titleNewQuizz.length >= 20 && titleNewQuizz.length <= 36) {
        retTitle = true;
        pos = 0;
        checkErroInfoBasics(pos);
    } else {
        pos = 0;
        showErroInfoBasics(pos);
    }
    try {
        let URLver = new URL(URLNewQuizz);
        retURLnq = true;
        pos = 1;
        checkErroInfoBasics(pos);
    } catch (err) {
        pos = 1;
        showErroInfoBasics(pos);
    }
    if (QuantAsks >= 3) {
        retQuantAsks = true;
        pos = 2;
        checkErroInfoBasics(pos);
    } else {
        pos = 2;
        showErroInfoBasics(pos);
    }
    if (quantLevel >= 2) {
        retQuantLevel = true;
        pos = 3;
        checkErroInfoBasics(pos);
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

function getOneQuizz(element) { // Começar quizz
    //create class for one quizz
    //change inner.html
    let id = element.querySelector('.quizz-id').textContent;
    let position = getPosition(id);
    console.log(position);
    let allPage = document.querySelector('.quizzes');
    let quizzSelected = document.querySelector('.quizz-selected')
    allPage.classList.add("none");
    quizzSelected.classList.remove('none');
    quizzSelected.innerHTML += `<div class="quizz-banner">
    <img src="${allQuizzes[position].image}" alt="">
    <p class="quizz-question">O quão potterhead é voce?</p>
    </div>`
    //esse número 4 corresponde a quantidade de perguntas requisitadas
    for (let i = 0; i < 4; i++) {
        quizzSelected.innerHTML += `<section class="selected-content">
        <div class="quizz-selected-container">
            <div class="question-container">
                <div class="question-container-title">
                    <p>${allQuizzes[position].title}</p>
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
                        <img src="${allQuizzes[position].image}" alt="" class="question-img">
                        <p class="answer">teste</p>
                    </div>
                    <div>
                        <img src="${allQuizzes[position].image}" alt="" class="question-img">
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

function getPosition(id){
    let idPosition = 0;
    for(let i=0;i<allQuizzes.length;i++){
        if(id==allQuizzes[i].id){
            idPosition += i;
        }
    }
    return idPosition;
}

function getQuizzID() {

}

function renderizeSelectedQuizz() {

}