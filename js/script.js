/* DEKLARACIA */
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const mainHeadline = document.getElementById('main-headline')
const mainTextInfo = document.getElementById('main-info-text')
const controlsButtons = document.getElementById('controls')
const mainFooter = document.getElementById('main-footer')

const questionContainerElement = document.getElementById('select')
const questionElement = document.getElementById('question')
const imageQuestionElement = document.getElementById('image')
const answerButtonsElement = document.getElementById('answer-buttons')
const checkResultsElement = document.getElementById('results')
const arrayOfAnswers = []


let shuffledQuestions, currentQuestionIndex

/* DEKLARACIA */






/* EVENT LISTENERS */
startButton.addEventListener('click', startGame)

function nextQuestionClick() {
  currentQuestionIndex++
  setNextQuestion()
}

nextButton.addEventListener('click', nextQuestionClick)
/* EVENT LISTENERS */


function startGame() {
  startButton.classList.add('hide')
  mainHeadline.classList.add('hide')
  mainTextInfo.classList.add('hide')
  controlsButtons.classList.add('hide')
  mainFooter.classList.add('hide')

  shuffledQuestions = questions


  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question) {
	questionElement.innerText = question.question
	imageQuestionElement.src = question.image

	
	question.answers.forEach( answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		button.classList.add('btn-dark')

		if (answer.correct) {
			button.dataset.correct = answer.correct
		}

		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	});
}



function resetState() {
  clearStatusClass(document.body)
  /*nextButton.classList.add('hide')*/
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}




function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  arrayOfAnswers[currentQuestionIndex] = correct?true:false
  console.log(arrayOfAnswers)

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length == currentQuestionIndex + 1) {

    nextButton.removeEventListener('click', nextQuestionClick)
    nextButton.addEventListener('click', checkResults)

  } 

/*
  else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
*/ 

}




function setStatusClass(element, correct) {
  clearStatusClass(element)

  if (correct) {
    element.classList.add('correct')
  } 

  else {
    element.classList.add('wrong')
  }
}





function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


function checkResults() {
	questionContainerElement.classList.add('hide')
  
}


/* OTAZKY */


const questions = [
  {
   question: 'Ktoré číslo dosadíte namiesto otáznika?',
   image: 'img/P1056907.JPG',
   answers: [
      { text: '20', correct: true },
      { text: '2', correct: false },
      { text: '3', correct: false },
      { text: '40', correct: false },
      { text: '5', correct: false },
      { text: '6', correct: false }
    ]
  },

  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A reprehenderit dignissimos quia amet in ducimus corrupti assumenda, labore corporis nostrum voluptate, expedita sequi blanditiis error cupiditate. Itaque officia, soluta aperiam.',
    image: 'img/img_test.jpg',
    answers: [
      { text: 'Jedna', correct: true },
      { text: 'Dva', correct: false },
      { text: 'Tri', correct: false },
      { text: 'Styri', correct: false },
      { text: 'Pat', correct: false },
      { text: 'Sest', correct: false }
    ]
  },

  {
    question: 'Ahoj',
    image: 'img/img_test.jpg',
    answers: [
      { text: 'Jaaa', correct: true },
      { text: 'Dvaaaaa', correct: false },
      { text: 'Traaaaai', correct: false },
      { text: 'Staaaayri', correct: false },
      { text: 'Paaaaat', correct: false },
      { text: 'Seaaaast', correct: false }
    ]
  },
]