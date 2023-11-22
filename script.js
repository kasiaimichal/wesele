let currentScreen = 0;
let incorrectAnswers = [0, 0, 0, 0];

const screens = document.querySelectorAll('.screen');
const code = document.getElementById('code');

document.getElementById('start-btn').addEventListener('click', function() {
    changeScreen(1); // Start with puzzle screen 1
});

function changeScreen(screenNumber) {

    const codes = ["_ _ _ _", "_ _ _ _", "5 _ _ _", "5 3 _ _", "5 3 8 _", "5 3 8 6"];

    screens[currentScreen].style.display = 'none'; // Hide current screen
    currentScreen = screenNumber;
    screens[currentScreen].style.display = 'block'; // Show new screen

    code.textContent = codes[currentScreen];

    window.scrollTo(0, 0);
}

function checkAnswer(screenNumber, correctAnswer, hint) {
    const answerInput = document.getElementById('answer-' + screenNumber);
    const userAnswer = answerInput.value.trim().toLowerCase(); // Normalize user input
    const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase(); // Normalize correct answer

    if (userAnswer === normalizedCorrectAnswer) {
        changeScreen(screenNumber + 1); // Move to the next screen on correct answer
    } else {
        incorrectAnswers[currentScreen] += 1;
        showAlert(incorrectAnswers[currentScreen] > 4 ? hint : incorrectAnswers[currentScreen] + " zła odpowiedź, spróbuj jeszcze raz :)", screenNumber);
    }
}

function showAlert(message, screenNumber) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.role = 'alert';
    alertDiv.textContent = message;

    const screen = screens[screenNumber];
    const container = screen.querySelector('.alert-placeholder');
    
    container.innerHTML = '';
    container.append(alertDiv);
}
