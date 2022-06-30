let allQuizzes = [];

const APIprefix = 'https://mock-api.driven.com.br/api/v4/buzzquizz/' 

let allQuizzesAPI = `${APIprefix}quizzes`
allQuizzes.then(getAllQuizzesAPI);
allQuizzes.catch(connectionError);

function getAllQuizzes(response){
    allQuizzes = allQuizzes.data;
    console.log(response);
}

function connectionError(response){
    
}