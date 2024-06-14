let turn=document.querySelectorAll('.boxToPlay');
let resetCnf=document.querySelector('#resetButton');
let player=document.querySelector('.player');
let results=document.querySelector('.result');
let modal=document.querySelector('.winnersmodal');
let wonBy1=document.querySelector('.matchWon1');
let wonBy2=document.querySelector('.matchWon2');
let lbplayer1=document.querySelector('.playerName1');
let lbplayer2=document.querySelector('.playerName2')
let close=document.querySelector('.close');
let reset=document.querySelector('#resetSure');
let cancel=document.querySelector('#cancel');
let resetmodal=document.querySelector('.resetmodal');
const patternsOfWin=[
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,6,9],
    [4,5,6],
    [7,8,9],
    [3,5,7]
]
let won1 = localStorage.getItem('won1') ? parseInt(localStorage.getItem('won1')) : 0;
let won2 = localStorage.getItem('won2') ? parseInt(localStorage.getItem('won2')) : 0;
lbplayer1.innerText = won1;
lbplayer1.innerText = won2;
const predictionOfWinner=()=>{
        for(let truple of patternsOfWin){
            if((turn[truple[0]-1].innerText!="") && (turn[truple[1]-1].innerText!="") && (turn[truple[2]-1].innerText!="")){
                IsMatchTie();
            if((turn[truple[0]-1].innerText===turn[truple[1]-1].innerText) && (turn[truple[1]-1].innerText===turn[truple[2]-1].innerText)){
                if(player1){
                    modal.style.display="block";
                    results.innerText=`${nameOfPlayer2} wins`;
                    turn.forEach(box => {
                        box.disabled = true;
                    });
                    won1++;
                    localStorage.setItem('won1', won1);
                    wonBy1.innerText = won1;
                }
                else{
                    modal.style.display="block";
                    results.innerText=`${nameOfPlayer1} wins`;
                    turn.forEach(box => {
                        box.disabled = true;
                    });
                    won2++;
                    localStorage.setItem('won2', won2);
                    wonBy2.innerText = won2;
                }
            }
        }
    }
}

const IsMatchTie=()=>{
    cnt=0;
    turn.forEach((box)=>{
        if(box.disabled===true){
            cnt++;
        }
    });
    if(cnt===9){
        modal.style.display="block";
        results.innerText=`Match is Tie`;
        turn.forEach(box => {
            box.disabled = true;
        });
    }
}
reset.onclick = function() {
    resetmodal.style.display = "none";
    resetfunc();
}
resetCnf.onclick=function() {
    resetmodal.style.display="block";
}
cancel.onclick = function() {
    resetmodal.style.display = "none";
}
close.onclick = function() {
    modal.style.display = "none";
    resetfunc();
}
let player1=true;
let nameOfPlayer1=prompt("Enter your Name:");
let nameOfPlayer2=prompt("Enter your Name:");
lbplayer1.innerText=`Match(s) won by ${nameOfPlayer1}:`;
lbplayer2.innerText=`Match(s) won by ${nameOfPlayer2}:`;
// if(nameOfPlayer1===NULL){
//     nameOfPlayer1="Player 1";
// }
// if(nameOfPlayer2===NULL){
//     nameOfPlayer2="Player 2";
// }
player.innerText=`First turn ${nameOfPlayer1}`;
turn.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(player1){
            player.innerText=nameOfPlayer2;
            box.innerText="O";
            box.disabled = true; 
            player1=false;
        }
        else{
            player.innerText=nameOfPlayer1;
            box.innerText="X";
            box.disabled = true;
            player1=true;
        }
        predictionOfWinner();
    })
});
const resetfunc=()=>{
    turn.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    player.innerText=`First turn ${nameOfPlayer1}`;
    player1 = true;
    // won1 = 0;
    // won2 = 0;
    localStorage.setItem('won1', won1);
    localStorage.setItem('won2', won2);
    document.querySelector('.matchWon1').innerText = won1;
    document.querySelector('.matchWon2').innerText = won2;
}
