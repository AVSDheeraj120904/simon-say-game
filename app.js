let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randBtn); 
    
    setTimeout(function() {
        gameFlash(randBtn);
    }, 500);
}

function btnPress(event) {
    let clickedBtn = event.target;
    userSeq.push(clickedBtn);
    userFlash(clickedBtn);
    if (!checkUserInput()) {
        gameOver();
    } else if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
        userSeq = []; 
    }
}

function checkUserInput() {
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] !== gameSeq[i]) {
            return false;
        }
    }
    return true;
}

function gameOver() {
    alert("Game Over! You made a mistake.");
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    h2.innerText = "Press any key to start";
}

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
