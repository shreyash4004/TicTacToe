const gameInfo=document.querySelector(".game-info")
const boxes=document.querySelectorAll(".box")
const newGame=document.querySelector(".btn")

let currentPlayer;
let gameGrid;
const winning=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText="";
        //removing color
        box.classList=`box box${index+1}`
        box.style.pointerEvents="all"
    })
    newGame.classList.remove("active")
    gameInfo.innerText=`Current Player -${currentPlayer}`

}
initGame()
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";

    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkOver(){
// newGame.classList.add("active")
let answer="";
winning.forEach((position) => {
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]!==""])
    && (gameGrid[position[0]] === gameGrid[position[1]]) &&
    (gameGrid[position[1]] === gameGrid[position[2]])){

        if(gameGrid[position[0]]==="X"){
            answer="X"
        }
        else{
            answer="O"
        }
        boxes.forEach((box) => {
            box.style.pointerEvents="none"
        })
        boxes[position[0]].classList.add("win")
        boxes[position[1]].classList.add("win")
        boxes[position[2]].classList.add("win")

    }
})

    if(answer !== ""){
        gameInfo.innerText=`Winner Player -${answer}`
        newGame.classList.add("active");
        return

    }

    //When there iS Tied
    let count=0;
    gameGrid.forEach((box) => {
        if(box !== "" ){
            count++;
        }
    })
    if(count===9){
        gameInfo.innerText="Game Tied"
        newGame.classList.add("active")
    }
}


function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer
        //Turn kro
        swapTurn();
        //check if wins
        checkOver();
    }
}

boxes.forEach((box,index )=> {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
})

newGame.addEventListener("click",initGame);