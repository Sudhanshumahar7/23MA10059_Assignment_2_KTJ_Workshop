let turn = document.querySelectorAll('.boxToPlay');
let resetCnf = document.querySelector('#resetButton');
let player = document.querySelector('.player');
let results = document.querySelector('.result');
let modal = document.querySelector('.winnersmodal');
let wonBy1 = document.querySelector('.matchWon1');
let wonBy2 = document.querySelector('.matchWon2');
let lbplayer1 = document.querySelector('.playerName1');
let lbplayer2 = document.querySelector('.playerName2');
let close = document.querySelector('.close');
let reset = document.querySelector('#resetSure');
let cancel = document.querySelector('#cancel');
let resetmodal = document.querySelector('.resetmodal');
let resetscore = document.querySelector('#resetscore');
let resetscoremsg = document.querySelector('.resetscoremsg');
let resetmodal2 = document.querySelector('.resetmodal2');
let resetscoreSure = document.querySelector('#resetscoreSure');
let cancel2 = document.querySelector('#cancel2');

const patternsOfWin = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
    [3, 5, 7]
];

let nameOfPlayer1 = prompt("Enter Player 1's Name:") || "Player 1";
let nameOfPlayer2 = prompt("Enter Player 2's Name:") || "Player 2";
let player1 = true;
let won1 = localStorage.getItem('won1') ? parseInt(localStorage.getItem('won1')) : 0;
let won2 = localStorage.getItem('won2') ? parseInt(localStorage.getItem('won2')) : 0;

lbplayer1.innerText = `Match(s) won by ${nameOfPlayer1}: ${won1}`;
lbplayer2.innerText = `Match(s) won by ${nameOfPlayer2}: ${won2}`;
player.innerText = `First turn: ${nameOfPlayer1}`;

const predictionOfWinner = () => {
    for (let pattern of patternsOfWin) {
        let [a, b, c] = pattern;
        if (turn[a - 1].innerText && turn[a - 1].innerText === turn[b - 1].innerText && turn[a - 1].innerText === turn[c - 1].innerText) {
            modal.style.display = "block";
            let winner = turn[a - 1].innerText === "X" ? nameOfPlayer1 : nameOfPlayer2;
            results.innerText = `${winner} wins`;
            turn.forEach(box => {
                box.disabled = true;
            });
            if (turn[a - 1].innerText === "X") {
                won1++;
                localStorage.setItem('won1', won1);
                wonBy1.innerText = won1;
            } else {
                won2++;
                localStorage.setItem('won2', won2);
                wonBy2.innerText = won2;
            }
            return;
        }
    }
    IsMatchTie();
}

const IsMatchTie = () => {
    let cnt = 0;
    turn.forEach((box) => {
        if (box.innerText !== "") {
            cnt++;
        }
    });
    if (cnt === 9) {
        modal.style.display = "block";
        results.innerText = `Match is Tie`;
        turn.forEach((box) => {
            box.disabled = true;
        });
    }
}

reset.onclick = function() {
    resetmodal.style.display = "none";
    resetfunc();
}

resetCnf.onclick = function() {
    resetmodal.style.display = "block";
}

cancel.onclick = function() {
    resetmodal.style.display = "none";
}

close.onclick = function() {
    modal.style.display = "none";
    resetfunc();
}

resetscore.onclick = function() {
    resetmodal2.style.display = "block";
    if (won1 > won2) {
        let winner = nameOfPlayer1;
        resetscoremsg.innerText = `${winner} is winner. Are you sure to Reset Score?`;
    } else if (won1 < won2) {
        let winner = nameOfPlayer2;
        resetscoremsg.innerText = `${winner} is winner. Are you sure to Reset Score?`;
    } else {
        resetscoremsg.innerText = "Match is Tie. Are you sure to Reset Score?";
    }
}

cancel2.onclick = function() {
    resetmodal2.style.display = "none";
}

resetscoreSure.onclick = function() {
    resetmodal2.style.display = "none";
    resetscorefunc();
}

turn.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1) {
            player.innerText = `Next turn: ${nameOfPlayer2}`;
            box.innerText = "X";
            box.disabled = true;
            player1 = false;
        } else {
            player.innerText = `Next turn: ${nameOfPlayer1}`;
            box.innerText = "O";
            box.disabled = true;
            player1 = true;
        }
        predictionOfWinner();
    });
});

const resetfunc = () => {
    turn.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    player.innerText = `First turn: ${nameOfPlayer1}`;
    player1 = true;
}

const resetscorefunc = () => {
    won1 = 0;
    won2 = 0;
    localStorage.setItem('won1', won1);
    localStorage.setItem('won2', won2);
    wonBy1.innerText = won1;
    wonBy2.innerText = won2;
}
