
	/* BUTTONS */
	const startButton = document.getElementById('start-btn')
	const endButton = document.getElementById('end-btn')

	const nextButton = document.getElementById('next-btn')
	const backButton = document.getElementById('back-btn')

	const lastButton = document.getElementById('last-btn')

	const showInstructionsButton = document.getElementById('instructions-btn')
	/* BUTTONS */


	/* MAIN MENU */
	const mainHeadline = document.getElementById('main-headline')
	const mainTextInfo = document.getElementById('main-info-text')
	const controlsButtons = document.getElementById('controls')
	/* MAIN MENU */


	/* QUESTION CONTAINER */
	const questionContainerElement = document.getElementById('select')
	const questionElement = document.getElementById('question')
	const imageQuestionElement = document.getElementById('image')
	const answerButtonsElement = document.getElementById('answer-buttons')
	const questionsEndContainerElement = document.getElementById('questions-end-container')
	
	let shuffledQuestions, currentQuestionIndex
	let numberOfCorrectAnswers = 0;
	/* QUESTION CONTAINER */

	/* FOOTER */
	const mainFooterContainerElement = document.getElementById('main-footer')
	/* FOOTER */


	/* INSTRUCTIONS */
	const instructionsContainerElement = document.getElementById('instructions-container')
	/* INSTRUCTIONS */

	/* RESULTS */
	const resultsContainerElement = document.getElementById('results-container')
	const arrayOfAnswers = []
	/* RESULTS */






/* -------------- EVENT LISTENERS + BUTTONS --------------- */
startButton.addEventListener('click', startGame)
endButton.addEventListener('click', showResults)
nextButton.addEventListener('click', nextQuestionClick)
backButton.addEventListener('click', backQuestionClick)
lastButton.addEventListener('click', lastQuestionClick)

showInstructionsButton.addEventListener('click', showInstructions)

function nextQuestionClick() {
  currentQuestionIndex++
  setNextQuestion()
}

function backQuestionClick() {
  currentQuestionIndex--
  setNextQuestion()
}

function lastQuestionClick() {
	questionsEndContainerElement.classList.add('hide')
	questionContainerElement.classList.remove('hide')

	currentQuestionIndex--

	showQuestion(shuffledQuestions[currentQuestionIndex])
}
/* -------------- EVENT LISTENERS + BUTTONS --------------- */




/* -------------- SHOW INSTRUCTIONS FUNCTION --------------- */
function showInstructions() {
	mainHeadline.classList.add('hide')
	mainTextInfo.classList.add('hide')
	controlsButtons.classList.add('hide')
	mainFooterContainerElement.classList.add('hide')
	questionContainerElement.classList.add('hide')


	instructions.classList.remove('hide')
	startButton.classList.remove('hide')
}
/* -------------- SHOW INSTRUCTIONS FUNCTION --------------- */





/* -------------- START NEW GAME --------------- */
function startGame() {
  startButton.classList.add('hide')
  instructions.classList.add('hide')
  instructionsContainerElement.classList.add('hide')

  questionContainerElement.classList.remove('hide')


  shuffledQuestions = questions
  shuffledQuestions.forEach((e)=> arrayOfAnswers.push(undefined))

  console.log(arrayOfAnswers)
  currentQuestionIndex = 0

  setInterval(updateCountDown, 1000)
  setNextQuestion()
}
/* -------------- START NEW GAME --------------- */




/* -------------- SET NEXT QUESTION --------------- */
function setNextQuestion() {
  resetState()

  // Ak je to prva otazka
  // skryje button back a zobrazi otazku
  // ak je to posledna otazka skryje next button
  // ak to nie je prvá otázka ani posledna otazka
  // zobrazí otázku aj s buttonom back + next
  
  if (currentQuestionIndex == 0 ) {		// prava otazka
  	backButton.classList.add('hide')
  	showQuestion(shuffledQuestions[currentQuestionIndex])
  }

  else if (currentQuestionIndex == shuffledQuestions.length ) {	// posledna otazka
  	nextButton.classList.add('hide')
  	questionContainerElement.classList.add('hide')
  	questionsEndContainerElement.classList.remove('hide')
  }

  else {
  	backButton.classList.remove('hide')		// stredan otazka (ani prava, ani posledna)
  	nextButton.classList.remove('hide')
  	questionsEndContainerElement.classList.add('hide')
  	showQuestion(shuffledQuestions[currentQuestionIndex])
  }
}
/* -------------- SET NEXT QUESTION --------------- */




/* -------------- SET LAST (BACK) QUESTION --------------- */
function setBackQuestion() {
	// pri kliknuti na button back
	// sa uzivatel vrati o jeden index -1 spat
	// a teda zobrazi predoslu otazku
	
	showQuestion(shuffledQuestions[currentQuestionIndex-1], arrayOfAnswers[currentQuestionIndex-1])
}
/* -------------- SET LAST (BACK) QUESTION --------------- */





/* -------------- SHOW QUESTION  --------------- */
function showQuestion(question, answer) {
	questionElement.innerText = question.question
	imageQuestionElement.src = question.image

	
	question.answers.forEach( answer => {
		const button = document.createElement('button')

		if (question.type) {
			button.classList.add('btn')
			button.classList.add('btn-bg')
			button.style.backgroundImage = 'url(' + answer.text + ')';
		}

		else {
			button.classList.add('btn')
			button.classList.add('btn-dark')
			button.innerText = answer.text
		}


		if (answer.correct) {
			button.dataset.correct = answer.correct
		}

		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	});

	if (answer) {
		setStatusClass(button, button === selectedButton)
	}
}
/* -------------- SHOW QUESTION  --------------- */




/* -------------- RESET STATE FUNCTION --------------- */
function resetState() {
  clearStatusClass(document.body)
  /*nextButton.classList.add('hide')*/
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
/* -------------- RESET STATE FUNCTION --------------- */





/* -------------- SELECT ANSWER FUNCTION --------------- */
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  arrayOfAnswers[currentQuestionIndex] = correct?true:false
  console.log(arrayOfAnswers)


  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button === selectedButton)
  })

  if (shuffledQuestions.length == currentQuestionIndex + 1) {

    nextButton.removeEventListener('click', nextQuestionClick)
    nextButton.addEventListener('click', showResults)
  } 
}
/* -------------- SELECT ANSWER FUNCTION --------------- */



/* -------------- SET / CLEAR STATUS CLASS --------------- */
function setStatusClass(element, correct) {
  clearStatusClass(element)

  if (correct) {
    element.classList.add('choose')
  } 

  else {
    element.classList.add('non-choose')
  }
}


function clearStatusClass(element) {
  element.classList.remove('choose')
  element.classList.remove('non-choose')
}
/* -------------- SET / CLEAR STATUS CLASS --------------- */



/* -------------- SHOW RESULTS --------------- */
function showResults() {
	numberOfCorrectAnswers = checkCorrectAnswers()
	console.log(checkNonAnsweredQuestions())

	questionContainerElement.classList.add('hide')
	questionsEndContainerElement.classList.add('hide')

	console.log(numberOfCorrectAnswers)
	resultsContainerElement.classList.remove('hide')
}
/* -------------- SHOW RESULTS --------------- */




/* -------------- CHECK CORRECT ANSWERS --------------- */
function checkCorrectAnswers() {
// prehladavanie pola 
// ak je true 
// filter vracia velkost pola
 
return arrayOfAnswers.filter(x => x === true).length;
}
/* -------------- CHECK CORRECT ANSWERS --------------- */




/* -------------- CHECK NON ANSWERED QUESTIONS --------------- */
function checkNonAnsweredQuestions() {
return arrayOfAnswers.filter(x => x === undefined).length;	
}
/* -------------- CHECK NON ANSWERED QUESTIONS --------------- */





/* -------------- TIMER / COUTDONW --------------- */
const countDownElement = document.getElementById('timer')
const startingMinutes = 2;
let time = startingMinutes * 60;



function updateCountDown() {

	const minutes = Math.floor(time / 60);
	let seconds = time % 60;

	seconds = seconds < 10 ? '0' + seconds : seconds;

	countDownElement.innerHTML = `${minutes}:${seconds}`

	if (minutes == 0 && seconds == 1) {
		showResults()
	}

	else {
		time--
	}
}
/* -------------- TIMER / COUTDONW --------------- */







/* --------------  QUIZOVE OTAZKY --------------- */

const questions = [
  {

   question:'Úloha 1: Ktoré číslo dosadíte namiesto otáznika?',
   image: 'img/test1/1.jpg',
   type: 'image',
   answers: [
      { text: './img/aaa.jpg', correct: false },
      { text: './img/aaa.jpg', correct: false },
      { text: './img/aaa.jpg', correct: false },
      { text: './img/aaa.jpg', correct: false },
      { text: './img/aaa.jpg', correct: false },
      { text: './img/aaa.jpg', correct: true }
    ]
  },

  {
  	question:'Úloha 2: Každý symbol má logickú hodnotu. Logickou úvahou dosadte správne číslo namiesto otázniku.',
    image: 'img/test1/2.jpg',
    answers: [
      { text: '6', correct: false},
      { text: '12', correct: false },
      { text: '7', correct: false },
      { text: '15', correct: true},
      { text: '10', correct: false },
      { text: '9', correct: false }
    ]
  },

  {
  	question:'Úloha 3: Tu je neobvyklý zámok na sejf. Aby sa otvoril, musíte každé z tlačidiel stlačiť len raz, a to v správnom poradí. Posledné tlačidlo, ktoré musíte stlačiť, je označené písmenom K. Počet ťahov a smer je označený na každom tlačidle. Takže 1U bude znamenať 1 ťah nahor, 1L jeden ťah doľava. Použite mriežku ako orientačný bod. Ktoré tlačidlo musíte stlačiť ako prvé? R-doprava D-dolu U-hore L-doľava K-posledné.',
    image: 'img/test1/3.jpg',
    answers: [
      { text: '5D', correct: false },
      { text: '3C', correct: false },
      { text: '1A', correct: false },
      { text: '4E', correct: false },
      { text: '1B', correct: false },
      { text: '2C', correct: true }
    ]
  },

  {
  	question:'Úloha 4: Dosaďte správne matematické znamienka medzi čísla tak, aby vám vyšiel uvedený výsledok. Aké znamienka to budú?',
    image: 'img/test1/4.jpg',
    answers: [
      { text: '- +', correct: false },
      { text: '+ -', correct: false },
      { text: 'x +', correct: false },
      { text: 'x -', correct: false },
      { text: '+ +', correct: true },
      { text: '- -', correct: false }
    ]
  },

  {
  	question:'Úloha 5: Ktorý z trojuholníkov bude nasledovať v tomto rade?',
    image: 'img/test1/1.jpg',
    type: 'image',
    answers: [
      { text: '- +', correct: false },
      { text: '+ -', correct: false },
      { text: 'x +', correct: false },
      { text: 'x -', correct: false },
      { text: '+ +', correct: true },
      { text: '- -', correct: false }
    ]
  },

  {
  	question:'Úloha 6: Objavte súvislosť medzi písmenami a číslicami. Aké číslo dosadíte do otáznika?',
    image: 'img/test1/1.jpg',
    answers: [
      { text: '14', correct: false },
      { text: '23', correct: true},
      { text: '9', correct: false },
      { text: '26', correct: false },
      { text: '2', correct: false },
      { text: '11', correct: false }
    ]
  },

  {
  	question:'Úloha 7: Ktorá z krabíc nemôže byť zložená z uvedenej predlohy?',
    image: 'img/test1/3.jpg',
    type: 'image',
    answers: [
      { text: '14', correct: false },
      { text: '23', correct: true},
      { text: '9', correct: false },
      { text: '26', correct: false },
      { text: '2', correct: false },
      { text: '11', correct: false }
    ]
  },

  {
  	question:'Úloha 8: Ktoré číslo dosadíte namiesto otáznika?',
    image: 'img/test1/3.jpg',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: false},
      { text: '1', correct: true },
      { text: '6', correct: false },
      { text: '2', correct: false },
      { text: '4', correct: false }
    ]
  },

  {
  	question:'Úloha 9:Ktoré hodiny budú nasledovať v tomto rade?',
    image: 'img/test1/3.jpg',
    type: 'image',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: false},
      { text: '1', correct: true },
      { text: '6', correct: false },
      { text: '2', correct: false },
      { text: '4', correct: false }
    ]
  },

  {
  	question:'Úloha 10: Z týchto tvarov sa dá zložiť číslica. Aká?',
    image: 'img/test1/2.jpg',
    answers: [
      { text: '2', correct: false },
      { text: '5', correct: false},
      { text: '7', correct: false },
      { text: '6', correct: false },
      { text: '4', correct: true },
      { text: '9', correct: false }
    ]
  },

  {
  	question:'Úloha 11: Pohybujte sa po kolieskach, ktoré sa vzájomne dotýkajú. Začnite v ľavom dolnom rohu a skončite v pravom hornom rohu. Nazbierajte deväť čísel a spočítajte ich. Aký je najvyšší možný súčet?',
    image: 'img/test1/2.jpg',
    answers: [
      { text: '36', correct: false },
      { text: '16', correct: false},
      { text: '18', correct: false },
      { text: '45', correct: false },
      { text: '29', correct: false },
      { text: '32', correct: true }
    ]
  },

  {
  	question:'Úloha 12: Tento štvorec je zostavený podľa logického vzoru. Ktorú kocku domina použijete na jeho doplnenie?',
    image: 'img/test1/2.jpg',
    type: 'image',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: false},
      { text: '1', correct: true },
      { text: '6', correct: false },
      { text: '2', correct: false },
      { text: '4', correct: false }
    ]
  },

  {
  	question:'Úloha 13: Ktorý z dielov doplní tento kruh?',
    image: 'img/test1/2.jpg',
    type: 'image',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: false},
      { text: '1', correct: true },
      { text: '6', correct: false },
      { text: '2', correct: false },
      { text: '4', correct: false }
    ]
  },

  {
  	question:'Úloha 14: Súčet každej línie piatich čísel je 20. Ktoré číslo dosadíte namiesto otáznika?',
    image: 'img/test1/2.jpg',
    answers: [
      { text: '4', correct: false },
      { text: '1', correct: false},
      { text: '3', correct: false},
      { text: '6', correct: true},
      { text: '5', correct: false },
      { text: '2', correct: false }
    ]
  },

  {
  	question:'Úloha 15: Začnite v akomkoľvek rohu a postupujte pozdĺž čiar. Nazbierajte ďalšie 4 čísla a všetkých päť čísel spočítajte. Jedno z dolných čísel musíte použiť na doplnenie číselného radu. Ak vyberiete správne číslo, súčet jednej z trás, ktorú vyberiete, bude 28. Ktoré číslo to je?',
    image: 'img/test1/2.jpg',
    answers: [
      { text: '4', correct: false },
      { text: '3', correct: false},
      { text: '6', correct: false},
      { text: '1', correct: false},
      { text: '5', correct: false },
      { text: '8', correct: true }
    ]
  },
]