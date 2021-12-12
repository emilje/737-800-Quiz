"use strict"

import * as questions from "./questions.js"
import * as model from "./model.js";

const startContainer = document.querySelector(".StartContainer");
const quizContainer = document.querySelector(".QuestionAndAnswer");
const selectionContainer = document.querySelector(".Selection");
const answersContainer = document.querySelector(".AnswersContainer");
const allAnswers = document.querySelectorAll(".Answer");
export const numberOfQuestions = document.querySelector(".QuestionNumber");
export const modal = document.querySelector(".Modal");
export const x = document.querySelector(".CloseButton");
export const modalTextPerc = document.querySelector(".ModalTextPerc");
export const modalText = document.querySelector(".ModalText")
export const modalText2 = document.querySelector(".ModalText2")

const questionNumberStartMenu = document.querySelector(".QuestionNumber");

const buttonStart = document.querySelector(".btnStart");
const buttonNext = document.querySelector(".NextQuestion");
const buttonPrevious = document.querySelector(".PreviousQuestion");
export const buttonFinish = document.querySelector(".Finish");



////////////////////////////////////////////////////////
export const resetAnswers = function () {
    allAnswers.forEach(ans => {
        ans.style.transform = "";
        ans.style.background = "";

    })
    // console.log(allAnswers);
};

buttonStart.addEventListener("click", function () {
    model.generateQuestionBank(+numberOfQuestions.textContent);
    model.generateAnswersPositions();
    model.state.answerHistory = new Array(+numberOfQuestions.textContent);
    model.setNextQuestion();
    //console.log("Current question:", model.state);
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");


});

selectionContainer.addEventListener("click", function (e) {
    const click = e.target.closest(".button");
    let number = questionNumberStartMenu.textContent;
    if (click === null) return;
    if (click.classList.contains("Plus")) {
        if (number == 10) return;
        number++;
        questionNumberStartMenu.textContent = number;
    }
    if (click.classList.contains("Minus")) {
        if (number == 1) return;
        number--;
        questionNumberStartMenu.textContent = number
    }

});

buttonFinish.addEventListener("click", model.calculateScore);

answersContainer.addEventListener("click", function (e) {
    resetAnswers();
    model.selectAnswer(e);

});

buttonNext.addEventListener("click", function () {
    model.setNextQuestion();
})
buttonPrevious.addEventListener("click", function () {
    model.setPrevQuestion();
});

modal.addEventListener("click", function (e) {
    console.log(e.target)
    if (e.target === modal || e.target === x) modal.classList.add("hidden");


});




