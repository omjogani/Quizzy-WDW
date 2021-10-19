//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const welcome = document.getElementById("welcome");


// if startQuiz button clicked
start_btn.addEventListener("click", () => {
    info_box.classList.add("activeInfo");
    start_btn.style.display = "none";
});

// if exitQuiz button clicked
exit_btn.addEventListener("click", () => {
    info_box.classList.remove("activeInfo");
    start_btn.style.display = "initial";
});

// if continueQuiz button clicked
continue_btn.addEventListener("click", () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    toogleBetweenInitialAndRunningProcess(true);
});


let que_count = 0;
let que_numb = 1;

exit_btn.addEventListener("click", () => {
    info_box.classList.remove("activeInfo");
});

function toogleBetweenInitialAndRunningProcess(isInitial) {
    if (isInitial) {
        showQuetions(0);
        questionCounter(1);

    } else {
        // ====== question and answer ======
        showQuetions(que_count);
        questionCounter(que_numb);

        next_btn.classList.remove("show");
    }
}


const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        toogleBetweenInitialAndRunningProcess(false);
    } else {

    }
};

function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let currentQuestion = questions[index];
    que_text.innerHTML = `<span> ${currentQuestion.numb}. ${currentQuestion.question}</span>`;
    option_list.innerHTML = '<div class="option"><span>' + currentQuestion.options[0] + "</span></div>" + '<div class="option"><span>' + currentQuestion.options[1] + "</span></div>" + '<div class="option"><span>' + currentQuestion.options[2] + "</span></div>" + '<div class="option"><span>' + currentQuestion.options[3] + "</span></div>";
    const option = option_list.querySelectorAll(".option");
    // to enable click event on all thje options...
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userSelectedAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    const totalNumberOfOptions = option_list.children.length;
    //correct answer 
    if (userSelectedAnswer == correctAnswer) {
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
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

function disableAndShowNext(totalNumberOfOptions) {
    //disable to select other answer
    for (i = 0; i < totalNumberOfOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    // display next button
    next_btn.classList.add("show");
}

function questionCounter(index) {
    // bottom question number incrementor
    bottom_ques_counter.innerHTML = "<span><p>" + index + "</p> of <p>" + questions.length + "</p> Questions</span>"; //adding new span tag inside bottom_ques_counter
}
