const problemElement = document.querySelector(".problem");
const form = document.querySelector(".form");
const field = document.querySelector(".field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMsg = document.querySelector(".end-msg");
const startBtn = document.querySelector(".start-btn");

let state = {
    score : 0,
    wrongAnswers : 0
}

function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.number1} ${state.currentProblem.operator} ${state.currentProblem.number2}`;
    field.value = "";
    field.focus();
}
updateProblem();

function generateNum(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        number1 : generateNum(10),
        number2 : generateNum(10),
        operator : ["+", "-", "x"] [generateNum(2)]
    }
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault()

    let correctAnswer
    const p = state.currentProblem
    if (p.operator == "+") correctAnswer = p.number1 + p.number2;
    if (p.operator == "-") correctAnswer = p.number1 - p.number2;
    if (p.operator == "x") correctAnswer = p.number1 * p.number2;

    if(parseInt(field.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.textContent = 10 - state.score;
        updateProblem();
        renderProgressBar();
    } else {
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers;
        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 331);
    }
    checkLogic();
}

function checkLogic() {
    if(state.score === 10) {
        endMsg.textContent = "Congrats! You won."
        document.body.classList.add("overlay-is-open");
        setTimeout(() => startBtn.focus(), 331);
    }
    if (state.wrongAnswers === 3) {
        endMsg.textContent = "You lost! Try again"
        document.body.classList.add("overlay-is-open")
        setTimeout(() => startBtn.focus(), 331);
    }
}

startBtn.addEventListener("click", resetGame)

function resetGame() {
    document.body.classList.remove("overlay-is-open");
    updateProblem();
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
    renderProgressBar();

}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`
}