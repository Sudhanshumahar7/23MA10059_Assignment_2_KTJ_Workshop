let turn=document.querySelectorAll('.boxToPlay');
let reset=document.querySelector('#resetButton');
let player=document.querySelector('.player');
let results=document.querySelector('.result');
let modal=document.querySelector('.winnersmodal');
let close=document.querySelector('.close');
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
const predictionOfWinner=()=>{
        for(let truple of patternsOfWin){
            if((turn[truple[0]-1].innerText!="") && (turn[truple[1]-1].innerText!="") && (turn[truple[2]-1].innerText!="")){
            if((turn[truple[0]-1].innerText===turn[truple[1]-1].innerText) && (turn[truple[1]-1].innerText===turn[truple[2]-1].innerText)){
                if(player1){
                    modal.style.display="block";
                    results.innerText=`${nameOfPlayer2} wins`;
                    turn.forEach(box => {
                        box.disabled = true;
                    });
                }
                else{
                    modal.style.display="block";
                    results.innerText=`${nameOfPlayer1} wins`;
                    turn.forEach(box => {
                        box.disabled = true;
                    });
                }
            }
        }
    }
}
close.onclick = function() {
    modal.style.display = "none";
}
let player1=true;
let nameOfPlayer1=prompt("Enter your Name:");
let nameOfPlayer2=prompt("Enter your Name:");
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
            player.innerText=nameOfPlayer1;
            box.innerText="O";
            box.disabled = true; 
            player1=false;
        }
        else{
            player.innerText=nameOfPlayer2;
            box.innerText="X";
            box.disabled = true;
            player1=true;
        }
        predictionOfWinner();
    })
});
reset.addEventListener("click", () => {
    turn.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    player.innerText=`First turn ${nameOfPlayer1}`;
    player1 = true;
});
