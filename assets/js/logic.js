var questions = [
  {
    prompt: 'What is 2+2?',
    answers: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswerIndex: 3
  },
  {
    prompt: 'What is 3+3?',
    answers: [
      "6",
      "2",
      "3",
      "4"
    ],
    correctAnswerIndex: 0
  },
  {
    prompt: 'What is 4+4?',
    answers: [
      "1",
      "8",
      "3",
      "4"
    ],
    correctAnswerIndex: 1
  }
]

var startButton = document.getElementById('start-button');
var promptHeader = document.getElementById('prompt-header');
var timerEl = document.getElementById('timer');
var scoreEl = document.getElementById('score');
var questionAnswer0 = document.getElementById('question-0');
var questionAnswer1 = document.getElementById('question-1');
var questionAnswer2 = document.getElementById('question-2');
var questionAnswer3 = document.getElementById('question-3');
var userInitialsInput = document.getElementById('user-initials');
var submitButton = document.getElementById('submit-initials');
var submitContainer = document.getElementById('submit-container');
var questionContainer = document.getElementById('question-container');
var timerContainer = document.getElementById('timer-container');

console.log(submitContainer);
console.log(questionContainer);

var questionAnswerElements = [
  questionAnswer0,
  questionAnswer1,
  questionAnswer2,
  questionAnswer3
]

var time = 90;
var questionIndex = 0;
var score = 0;

function loadQuestion(question) {
  promptHeader.textContent = question.prompt;
  for (var i = 0; i < question.answers.length; i++) {
    questionAnswerElements[i].textContent = question.answers[i];
  }
}

function questionAnswerClickHandler(event) {
  var answerClicked = event.target;
  var answerIndex = answerClicked.getAttribute('data-index');
  if (answerIndex == questions[questionIndex].correctAnswerIndex) {
    answeredQuestionCorrectly()
  } else {
    answeredQuestionIncorrectly()
  }
  questionIndex++;
  if (questionIndex >= questions.length) {
    time = 0;
  } else {
    loadQuestion(questions[questionIndex]);
  }
}

function answeredQuestionCorrectly() {
  score += 10;
  scoreEl.textContent = score;
}

function answeredQuestionIncorrectly() {
  time -= 10;
}

function startQuiz() {
  toggleVisibility(questionContainer);
  toggleVisibility(startButton);
  var timerInterval = setInterval(function() {
    time--;
    if (time <= 0) {
      timerEl.textContent = 0;
      endGame();
      clearInterval(timerInterval);
    } else {
      timerEl.textContent = time;
    }
  }, 1000)

  loadQuestion(questions[questionIndex]);
}

function endGame() {
  toggleVisibility(questionContainer);
  toggleVisibility(submitContainer);
  toggleVisibility(timerContainer);
  // hide questions
  // made user input visible
}

function submitScore() {
  var userInitials = userInitialsInput.value;
  localStorage.setItem(userInitials, score);
}

function toggleVisibility(element) {
  if (element.className == 'hidden') {
    element.className = 'visible';
  } else {
    element.className = 'hidden';
  }
}

function setUpClickListeners() {
  for (var i = 0; i < questionAnswerElements.length; i++) {
    questionAnswerElements[i].addEventListener('click', questionAnswerClickHandler);
  }
}

setUpClickListeners();
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submitScore);