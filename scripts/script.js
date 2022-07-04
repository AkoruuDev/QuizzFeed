let allQuizzes = [];
let correctAnswerBoolean = 'true';
let resultCounter = 0;
let levelsArray = [];
let questionsArray = [];
let quizzSelected;
let clickNumbers = 0;

const APIprefix = 'https://mock-api.driven.com.br/api/v7/buzzquizz/'

let allQuizzesPromise = axios.get(`${APIprefix}quizzes`);
allQuizzesPromise.then(getAllQuizzes);
allQuizzesPromise.catch(connectionError);

function getAllQuizzes(response) {
    allQuizzes = response.data;
    renderizeAllQuizzes(allQuizzes);
    console.log(allQuizzes);
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
let reg = /^#([0-9a-f]{3}){1,2}$/i;

function sNewQuiz() {
    console.log(titleNewQuizz);
    console.log(URLNewQuizz);
    console.log(questionsNewQuizz);
    console.log(levelsNewQuizz);
}

function createQuizz() { // Criar novo quizz
    let pageOff = document.querySelector(".quizzes");
    let pageOn = document.querySelector(".newQuizz");
    pageOff.classList.add("none");
    pageOn.classList.remove("none");
}

function saveInfoBasicsNewQuizz() {
    titleNewQuizz = "";
    URLNewQuizz = "";

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

    for (let i = 1; i <= QuantAsks; i++) {
        let messagePrint = `
            <li class="content closedFolder Question${i}" onclick="openQuestionSelected(this)">              
                <span class="closedQuestion">
                    <p class="areaTitle">Pergunta ${i}</p>
                    <ion-icon name="create-outline"></ion-icon> <!-- Create -->
                </span>
                <div class="questions none">
                    <input type="text" placeholder="Sua pergunta" class="titleQuestion${i}">
                    <p class="error errortitleQuestion${i} none">Sua pargunta deve ter, no mímino, 20 caracteres</p>
                    <input type="text" placeholder="Cor de fundo da pergunta" class="colorQuestion${i}">
                    <p class="error errorcolorQuestion${i} none">A cor escolhida deve estar no padrão hexadecimal com # (ex: #FAFAFA)</p>
                    Resposta correta
                    <input type="text" placeholder="Resposta correta" class="rightQuestion${i}">
                    <p class="error errorRigthAskQuestion${i} none">Este campo deve estar preenchido</p>
                    <input type="text" placeholder="URL da imagem" class="imageRightQuestion${i}">
                    <p class="error errorURLRightAskQuestion${i} none">Este campo deve estar no formato URL (de link)</p>
                    Respostas incorretas
                    <input type="text" placeholder="Resposta incorreta 1" class="wrong1Question${i}">
                    <p class="error errorwrong1Question${i} none">Este campo deve estar preenchido</p>
                    <input type="text" placeholder="URL da imagem 1" class="URLwrong1Question${i}">
                    <p class="error errorURLwrong1Question${i} none">Este campo deve estar no formato URL (de link)</p>
                    <input type="text" placeholder="Resposta incorreta 2" class="wrong2Question${i}">
                    <input type="text" placeholder="URL da imagem 2" class="URLwrong2Question${i}">
                    <p class="error errorURLwrong2Question${i} none">Este campo deve estar no formato URL (de link)</p>
                    <input type="text" placeholder="Resposta incorreta 3" class="wrong3Question${i}">
                    <input type="text" placeholder="URL da imagem 3" class="URLwrong3Question${i}">
                    <p class="error errorURLwrong3Question${i} none">Este campo deve estar no formato URL (de link)</p>
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

    for (let i = 1; i <= qtd; i++) {
        document.querySelector(`.Question${i} .closedQuestion ion-icon`).classList.remove("none");
        document.querySelector(`.Question${i} .questions`).classList.add("none");
        document.querySelector(`.Question${i}`).classList.add("closedFolder");
    }
}

function saveQuestionsNewQuizz() {
    questionsNewQuizz = [];

    let rettitleNewQuizz = false;

    let length = document.querySelectorAll(".creatingNewQuestions .bas-content .content").length;
    for (let i = 1; i <= length; i++) {
        let titleQuestion = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .titleQuestion${i}`).value
        if (titleQuestion.length < 20) {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errortitleQuestion${i}`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errortitleQuestion${i}`).classList.add("none");
            rettitleNewQuizz = true;
        }

        let colorQuestion = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .colorQuestion${i}`).value
        
        if (!reg.test(`${colorQuestion}`)) {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorcolorQuestion${i}`).classList.remove("none");
            rettitleNewQuizz = false;
            console.log(rettitleNewQuizz)
        } else {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorcolorQuestion${i}`).classList.add("none");
            let qtdAccept = document.querySelectorAll(`.creatingNewQuestions .bas-content .questions .none`).length;
            if (qtdAccept === (length * 10)) {
                rettitleNewQuizz = true;
            }
        }

        let rightAsk = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .rightQuestion${i}`).value
        if (rightAsk == '') {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorRigthAskQuestion${i}`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorRigthAskQuestion${i}`).classList.add("none");
            rettitleNewQuizz = true;
        }

        let URLRQ = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .imageRightQuestion${i}`).value
        try {
            let URLver = new URL(URLRQ);
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLRightAskQuestion${i}`).classList.add("none");
            rettitleNewQuizz = true;
        } catch (err) {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLRightAskQuestion${i}`).classList.remove("none");
            rettitleNewQuizz = false;
        }

        let wrong1 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .wrong1Question${i}`).value
        if (wrong1 == '') {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorwrong1Question${i}`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorwrong1Question${i}`).classList.add("none");
            rettitleNewQuizz = true;
        }

        let URLw1 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .URLWrong1Question${i}`).value
        try {
            let URLver = new URL(URLw1);
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong1Question${i}`).classList.add("none");
            rettitleNewQuizz = true;
        } catch (err) {
            document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong1Question${i}`).classList.remove("none");
            rettitleNewQuizz = false;
        }

        let wrong2 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .wrong2Question${i}`).value
        if (wrong2 != '') {
            let URLw2 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .URLWrong2Question${i}`).value
            try {
                let URLver = new URL(URLw2);
                document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong2Question${i}`).classList.add("none");
                rettitleNewQuizz = true;
            } catch (err) {
                document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong2Question${i}`).classList.remove("none");
                rettitleNewQuizz = false;
            }
        }

        let wrong3 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .wrong3Question${i}`).value
        if (wrong3 != '') {
            let URLw2 = document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .URLWrong3Question${i}`).value
            try {
                let URLver = new URL(URLw2);
                document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong3Question${i}`).classList.add("none");
                rettitleNewQuizz = true;
            } catch (err) {
                document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .errorURLwrong3Question${i}`).classList.remove("none");
                rettitleNewQuizz = false;
            }
        }
        
        console.log(rettitleNewQuizz)
    }

    if (rettitleNewQuizz) {
        const allQuestions = document.querySelectorAll(".creatingNewQuestions .bas-content .content");
        for (let i = 1; i <= allQuestions.length; i++) {
            let answersNewQuizz = [];
            answersNewQuizz.push({
                text: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .rightQuestion${i}`).value,
                image: document.querySelector(`.creatingNewQuestions .bas-content .Question${i} .questions .imageRightQuestion${i}`).value,
                isCorrectAnswer: true
            })

            for (let c = 1; c < 4; c++) {
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
}

function createLevelsArea(quantLevel) {
    const print = document.querySelector(".creatingLevels .bas-content");
    print.innerHTML = ""

    for (let i = 1; i <= quantLevel; i++) {
        let messagePrint = `
            <li class="content closedFolder Level${i}" onclick="openLevelSelected(this)">              
                <span class="closedLevel">
                    <p class="areaTitle">Nível ${i}</p>
                    <ion-icon name="create-outline"></ion-icon> <!-- Create -->
                </span>
                <div class="Levels none">
                    <input type="text" placeholder="Título do nível" class="levelTitle">
                    <p class="error errorlevelTitle none">este campo deve ter, no mínimo, 10 caracteres</p>
                    <input type="text" placeholder="% de acerto mínima" class="minValue">
                    <p class="error errorminValue none">Apenas números, de 0 à 100</p>
                    <input type="text" placeholder="URL da imagem do nível" class="levelImage">
                    <p class="error errorlevelImage none">Este campo deve estar no formato URL (de link)</p>
                    <textarea cols="30" rows="10" placeholder="Descrição do Nível" class="levelDescription"></textarea>
                    <p class="error errorlevelDescription none">este campo deve ter, no mínimo, 30 caracteres</p>
                </div>                           
            </li>
        `
        // .creatingLevels .bas-content .Level1 .errorlevelImage1

        print.innerHTML += messagePrint;
    }
}

function openLevelSelected(element) {
    checkOthersCheckboxLevels();
    element.querySelector(".closedLevel ion-icon").classList.add("none");
    element.querySelector(".levels").classList.remove("none");
    element.classList.remove("closedFolder");
}

function checkOthersCheckboxLevels() {
    const qtd = document.querySelectorAll(".creatingLevels .bas-content li").length;

    for (let i = 1; i <= qtd; i++) {
        document.querySelector(`.Level${i} .closedLevel ion-icon`).classList.remove("none");
        document.querySelector(`.Level${i} .levels`).classList.add("none");
        document.querySelector(`.Level${i}`).classList.add("closedFolder");
    }
}

function saveLevelsNewQuizz() {
    levelsNewQuizz = [];

    let rettitleNewQuizz = false;
    let c = false;

    let length = document.querySelectorAll(".creatingLevels .bas-content .content").length;
    for (let i = 1; i <= length; i++) {
        let titleName = document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelTitle`).length;
        console.log(titleName);
        if (titleName < 20) {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelTitle`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelTitle`).classList.add("none");
            rettitleNewQuizz = true;
        }

        let minValue = document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .minValue`).value;
        console.log(minValue);
        if (minValue < 0 || minValue > 100) {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorminValue`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorminValue`).classList.add("none");
            rettitleNewQuizz = true;
        }

        let levelImage = document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelImage`).value;
        console.log(levelImage);
        try {
            let URLver = new URL(levelImage);
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelImage`).classList.add("none");
            rettitleNewQuizz = true;
        } catch (err) {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelImage`).classList.remove("none");
            rettitleNewQuizz = false;
        }

        let levelDescription = document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelDescription`).length;
        console.log(levelDescription);
        if (levelDescription < 30) {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelDescription`).classList.remove("none");
            rettitleNewQuizz = false;
        } else {
            document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .errorlevelDescription`).classList.add("none");
            rettitleNewQuizz = true;
        }
    }
    for (let i = 1; i <= length; i++) {
        let minValue = document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .minValue`).value;
        let count = 1
        if (minValue == 0) {
            c = true;
        } else {
            count = count + 1;
        }

        if (count == length) {
            alert("É necessário que pelo menos um nível tenha o acerto minimo de 0%")
        }
    }

    if (rettitleNewQuizz && c) {
        const allLevels = document.querySelectorAll(".creatingLevels .bas-content .content");
        for (let i = 1; i <= allLevels.length; i ++) {
            levelsNewQuizz.push({
                title: document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelTitle`).value,
                image: document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelImage`).value,
                text: document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .levelText`).value,
                minValue: document.querySelector(`.creatingLevels .bas-content .Level${i} .Levels .minValue`).value
            });
        }

        createEndQuizzArea()

        const pageOff = document.querySelector(".creatingLevels");
        const pageOn = document.querySelector(".createdNewQuizz");

        pageOff.classList.add("none");
        pageOn.classList.remove("none");
    }
}

function createEndQuizzArea() {
    const print = document.querySelector(".createdNewQuizz .bas-content");
    print.innerHTML = ""
    message = `
        <div class="quizz-boxes">
            <img src="${URLNewQuizz}" alt="Image">
            <div class="gradient"></div>
            <p class="title">${titleNewQuizz}</p>
        </div>
    `
    print.innerHTML += message;
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

// Tratamento de erros NewQuizz
function checkFieldsOnCreateQuestions(titleNewQuizz, URLNewQuizz, QuantAsks, quantLevel) {
    // Error hadling about InfoBasics
    // Check null areas and content type
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

function showErroInfoBasics(pos) {
    // Function function
    // Called to check InfoBasics
    // Show error message
    let error = document.querySelectorAll(".createNewQuizz .basicsInfo .content .error");

    error[pos].classList.remove("none");
}

function checkErroInfoBasics(pos) {
    // Function function
    // Called to check InfoBasics
    // Strip error message
    let error = document.querySelectorAll(".createNewQuizz .basicsInfo .content .error");

    if (!error[pos].classList.contains("none")) {
        error[pos].classList.add("none");
    }
}

// Start a Quizz
function getOneQuizz(element) { // Começar quizz
    //create class for one quizz
    //change inner.html
    let id = element.querySelector('.quizz-id').textContent;
    let position = getPosition(id);
    console.log(allQuizzes);
    let allPage = document.querySelector('.quizzes');
    quizzSelected = document.querySelector('.quizz-selected');
    questionsArray = allQuizzes[position].questions;
    levelsArray = allQuizzes[position].levels;
    let answersArray = [];
    let k=0;
    for (let i = 0; i < questionsArray.length; i++) {
        answersArray[i] = questionsArray[i].answers;
    }
    var lengths = answersArray.map(answersOption => answersOption.length);
    allPage.classList.add("none");
    quizzSelected.classList.remove('none');
    quizzSelected.innerHTML += `
        <div class="quizz-banner">
            <img src="${allQuizzes[position].image}" alt="">
            <p class="quizz-question">${allQuizzes[position].title}</p>
        </div>
    `
    for (let i = 0; i < questionsArray.length; i++) {
        quizzSelected.innerHTML += `
            <section class="selected-content">
                <div class="quizz-selected-container">
                    <div class="question-container">
                        <div class="question-container-title">
                            <p>${questionsArray[i].title}</p>
                        </div>
                    </div>
                </div>
            </section>`
            for (let j = 0; j < lengths[i]; j++) {
                quizzSelected.innerHTML +=`
                    <section class="selected-content">
                        <div class="quizz-selected-container">
                            <div class="question-container">
                                <div class="question-img-container" onclick="correctAnswer(this)">
                                    <div>
                                        <img src="${questionsArray[i].answers[j].image}" alt="" class="question-img">
                                        <p class="answer">${questionsArray[i].answers[j].text}</p>
                                        <div class="correct-answer">${questionsArray[i].answers[j].isCorrectAnswer}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            }
    }
    
}

function getPosition(id) {
    let idPosition = 0;
    for (let i = 0; i < allQuizzes.length; i++) {
        if (id == allQuizzes[i].id) {
            idPosition += i;
        }
    }
    return idPosition;
}

function correctAnswer(element){
    let trueOrFalse = element.querySelector('.correct-answer').textContent;
    if(trueOrFalse===correctAnswerBoolean){
        element.classList.add('correct');
        resultCounter++;
        clickNumbers++;
    }
    else{
        element.classList.add('false');
        clickNumbers++;
    }
    if(clickNumbers===questionsArray.length){
        let resultPercentage = resultCalculator(resultCounter, questionsArray.length);
        console.log(resultPercentage);
        showResult(quizzSelected, resultPercentage);
    }
}

function resultCalculator(counter, length){
    return (100*counter)/length;
}

function showResult(resultHTML, percentage){
    let correctLevelIndex = 0;
    for(let i=1;i<levelsArray.length;i++){
        if(percentage>=levelsArray[i].minValue){
            correctLevelIndex = i;
        }
    }
    console.log(correctLevelIndex);
    resultPrinter(resultHTML, correctLevelIndex);
}

function resultPrinter(result, index){
    result.innerHTML += `
        <section class="selected-content">
            <div class="quizz-selected-container">
                <div class="result">
                    <div>
                        <h1 class="result-title">${levelsArray[index].text}</h1>
                        <img src="${levelsArray[index].image}" alt="" class="result-img">
                        <p class="final-message">
                        ${levelsArray[index].text}
                        </p>
                    </div>
                </div>
                <div class="button-container">
                    <button class="restart-quizz" onclick="restartQuizz()">
                        Reiniciar quizz
                    </button>
                    <button class="back-home" onclick="backInitialPage()">
                        Voltar para Home
                    </button>
                </div>
            </div>
        </section>
    `;
}

function restartQuizz() {

}

function backInitialPage() {
    window.location.reload();
}