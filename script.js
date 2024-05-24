(function () {
  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const restartButton = document.getElementById("restart"); // New restart button
  let currentSlide = 0;
  let numCorrect = 0;

  const myQuestions = [
    {
      question: "How tall is Jahaziel?",
      answers: {
        a: "5'6\"",
        b: "6'1\"",
        c: "5'11\"",
      },
      correctAnswer: "c",
    },
    {
      question: "What is Jahaziel's favorite music genre?",
      answers: {
        a: "Latin pop",
        b: "Techno",
        c: "Reggaeton",
      },
      correctAnswer: "c",
    },
    {
      question: "Jahaziel's max bench press?",
      answers: {
        a: "225 pounds",
        b: "250 pounds",
        c: "145 pounds",
        d: "185 pounds",
      },
      correctAnswer: "d",
    },
  ];

  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (let letter in currentQuestion.answers) {
        answers.push(
          `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
        );
      }

      output.push(
        `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join("")}</div>
                <div class="image-container">
                    <img src="img.jpeg" alt="Image" class="question-image">
                </div>
            </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // Reset the number of correct answers
    numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    if (numCorrect === myQuestions.length) {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}. Jahaziel's favorite song is playing!`;
    } else {
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  }

  function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function restartQuiz() {
    // Reset quiz to initial state
    currentSlide = 0;
    numCorrect = 0;
    buildQuiz();
    showSlide(currentSlide);
    resultsContainer.innerHTML = "";
  }

  function handleSubmitClick() {
    showResults();
    scrollToTop();
  }

  function handlePreviousClick() {
    showSlide(currentSlide - 1);
    scrollToTop();
  }

  function handleNextClick() {
    showSlide(currentSlide + 1);
    scrollToTop();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buildQuiz();
  const slides = document.querySelectorAll(".slide");
  showSlide(currentSlide);

  submitButton.addEventListener("click", handleSubmitClick);
  previousButton.addEventListener("click", handlePreviousClick);
  nextButton.addEventListener("click", handleNextClick);
  restartButton.addEventListener("click", restartQuiz); // Event listener for restart button
})();
