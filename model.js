import * as questions from "./questions.js";
import { resetAnswers, buttonFinish, modal, modalText, numberOfQuestions, modalTextPerc, modalText2 } from "./script.js";

const answers = document.querySelectorAll(".Answer");
const question = document.querySelector(".QuestionParagaph");


const questionBank = [];
let correctAnswerIndex = [];

let questionNumber = 0;
let currentSelection;

export const state = {
    question: "",
    answers: [], // Answer 1 is the correct answer.
    selection: "",
    answerHistory: [],

};

export const generateAnswersPositions = function () {

    questionBank.map(question => {
        state.answers.push(shuffle(question.answers));
    });


};


//////////// THIS CODE FOUND ON STACK OVERFLOW //////////////////
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
/////////////////////////////////////////////////////////////////

export const generateQuestionBank = function (number) {
    for (let i = 0; i < number; i++) {
        questionBank.push(questions.allQuestions[i]);

    }
    console.log(questionBank);

}


const updateQuestion = function () {
    question.textContent = `${questionNumber}) ${state.question}`;

    let i = 0;
    answers.forEach(answer => {
        answer.firstElementChild.textContent = state.answers[questionNumber - 1][i];
        i++
    });


}

const setState = function () {
    // Highlight the previously selected question
    if (state.answerHistory[questionNumber - 1])
        document.getElementById(state.answerHistory[questionNumber - 1]).closest(".Answer").click();
    //



    state.question = [];
    const currentQuestion = questionBank[questionNumber - 1];
    state.question = currentQuestion.question;

}

export const selectAnswer = function (e) {
    const click = e.target.closest(".Answer");
    if (click === null) return;
    currentSelection = click.firstElementChild.id
    state.answerHistory.splice(questionNumber - 1, 1, currentSelection);
    //console.log(state.answerHistory);
    // console.log(currentSelection);

    click.style.transform = "translateX(10px)";
    click.style.background = "rgb(150, 150, 150,0.2)"
}


const correction = function () {
    if (correctAnswerIndex.length > 0) {

        const corAns = document.getElementById(correctAnswerIndex[questionNumber - 1] + 1).closest(".Answer");
        console.log(questionNumber);
        console.log(corAns);
        corAns.style.background = "green";


    }
    //
}


export const setNextQuestion = function () {

    if (questionNumber > questionBank.length - 1) return;
    resetAnswers();
    questionNumber++;
    setState();
    updateQuestion();
    correction();

    if (questionNumber === questionBank.length) {

        buttonFinish.classList.remove("hidden");
    }

}

export const setPrevQuestion = function () {
    if (questionNumber == 1) return;
    resetAnswers();
    questionNumber--;
    setState();
    updateQuestion();
    correction();

}



export const calculateScore = function () {


    correctAnswerIndex = [];
    let correctAnswers = 0;
    const incorrectQuestions = [];
    //console.log(questionBank.length);
    for (let i = 0; i < questionBank.length; i++) {


        correctAnswerIndex.push(state.answers[i].indexOf(questionBank[i].correct));



        console.log(`Correct answer for question number ${i + 1} was ${questionBank[i].correct}. Your answer was ${state.answers[i][state.answerHistory[i] - 1]} `);

        if (questionBank[i].correct === state.answers[i][state.answerHistory[i] - 1]) correctAnswers++;
        else incorrectQuestions.push(i + 1);
    }
    correction();
    console.log(`You answered ${correctAnswers} questions correctly.`)
    console.log(`You have incorrectly answered the following questions: ${incorrectQuestions}`);
    console.log(correctAnswerIndex);

    modalTextPerc.textContent = `You scored ${(correctAnswers / numberOfQuestions.textContent * 100).toFixed(0)}%`;
    modalText.textContent = `You have incorrectly answered the following questions: ${incorrectQuestions}.`;
    modalText2.textContent = `Please check the correct answers by going back through the questions.`

    modal.classList.remove("hidden");


}









