//selecting all required elements
const start_btn_container = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn button");
const welcome_msg = document.querySelector(".start_btn .welcome_msg");
const name_of_user = document.querySelector(".start_btn .nameOfUser");
const error_text = document.querySelector(".start_btn .error_text");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const welcome = document.getElementById("welcome");
let nameOfUserVariable = " ";

// if startQuiz button clicked
start_btn.addEventListener("click", () => {
  nameOfUserVariable = name_of_user.value;
  console.log(nameOfUserVariable);
  if (!nameOfUserVariable == " " && nameOfUserVariable != null) {
    error_text.textContent = " ";
    info_box.classList.add("activeInfo");
    welcome_msg.style.display = "none";
    name_of_user.style.display = "none";
    start_btn_container.style.display = "none";
    start_btn.style.display = "none";
  } else {
    error_text.textContent = "Please Enter Your Name";
  }
});

// if exitQuiz button clicked
exit_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  start_btn_container.style.display = "initial";
  start_btn.style.display = "initial";
  name_of_user.style.display = "block";
  welcome_msg.style.display = "block";
});

// if continueQuiz button clicked
continue_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  toogleBetweenInitialAndRunningProcess(true);
});

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let totalUserScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// last result buttons
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

exit_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
});

function toogleBetweenInitialAndRunningProcess(isInitial) {
  if (isInitial) {
    showQuetions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
  } else {
    // ====== question and answer ======
    showQuetions(que_count);
    questionCounter(que_numb);
    // clear current interval for Timer and Timeline ======
    clearInterval(counter);
    clearInterval(counterLine);
    // ====== Timer and Timeline start ======
    startTimer(timeValue);
    startTimerLine(widthValue);
    // ====== Initial value when time is going on and unvisible next button ======
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
  }
}

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  totalUserScore = 0;
  widthValue = 0;
  toogleBetweenInitialAndRunningProcess(false);
};

quit_quiz.onclick = () => {
  window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    toogleBetweenInitialAndRunningProcess(false);
  } else {
    // question are over then show result
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  let currentQuestion = questions[index];
  que_text.innerHTML = `<span> ${currentQuestion.numb}. ${currentQuestion.question}</span>`;
  option_list.innerHTML =
    '<div class="option"><span>' +
    currentQuestion.options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    currentQuestion.options[3] +
    "</span></div>";
  const option = option_list.querySelectorAll(".option");
  // to enable click event on all thje options...
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userSelectedAnswer = answer.textContent;
  let correctAnswer = questions[que_count].answer;
  const totalNumberOfOptions = option_list.children.length;
  //correct answer
  if (userSelectedAnswer == correctAnswer) {
    totalUserScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    for (i = 0; i < totalNumberOfOptions; i++) {
      if (option_list.children[i].textContent == correctAnswer) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }
  disableAndShowNext(totalNumberOfOptions);
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (totalUserScore > 3) {
      scoreText.innerHTML = `<span>${nameOfUserVariable} congrats! 🎉, You got <p> ${totalUserScore} </p> out of <p> ${questions.length} </p></span>`;
    } else if (totalUserScore > 1) {
      scoreText.innerHTML = `<span>${nameOfUserVariable} nice 😎, You got <p>  ${totalUserScore} </p> out of <p> ${questions.length} </p></span>`;
  } else {
      scoreText.innerHTML = `<span>${nameOfUserVariable} sorry 😐, You only got <p>  ${totalUserScore} </p> out of <p> ${questions.length} </p></span>`;
    }
  }
  
  function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
      timeCount.textContent = time; //update time value to the user interface
      time--;
      if (time < 9) {
        timeCount.textContent = "0" + timeCount.textContent;
      }
      if (time < 0) {
        timeText.textContent = "Time Out";
        clearInterval(counter);
        const totalNumberOfOptions = option_list.children.length;
        let correctAns = questions[que_count].answer;
        // marking the correct answer after time out
        for (i = 0; i < totalNumberOfOptions; i++) {
          if (option_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          }
        }
      disableAndShowNext(totalNumberOfOptions);
      }
    }
  }

function disableAndShowNext(totalNumberOfOptions) {
  //disable to select other answer
  for (i = 0; i < totalNumberOfOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  // display next button
  next_btn.classList.add("show");
}

function startTimerLine(time) {
    counterLine = setInterval(function () {
      time++;
      time_line.style.width = time + "px"; // increment width of line
      if (time > 549) {
        clearInterval(counterLine);
      }
    }, 30);
  }
  

function questionCounter(index) {
  // bottom question number incrementor
  bottom_ques_counter.innerHTML =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>"; //adding new span tag inside bottom_ques_counter
}
