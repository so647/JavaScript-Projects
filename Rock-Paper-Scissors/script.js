let playerScore = 0;
let compScore = 0;
let gameInProgress = true; 

const currentScoreElement = document.getElementById("currentScore");
const finalScoreElement = document.getElementById("finalScore");
const resultElement = document.getElementById("result")
const chosenIconElement = document.getElementById("chosenIcon")
const finalWinnerElement = document.getElementById("finalWinner")


const choices = ["Rock", "Paper", "Scissors"];

function resetGame(){
    playerScore = 0;
    compScore = 0;
    chosenIconElement.textContent = "";
    resultElement.textContent = "";
    currentScoreElement.textContent = "";
    finalScoreElement.textContent = "";
    finalWinnerElement.textContent = "";
    gameInProgress = true; 

}
//Clears text content of elem. not needed in ending screen at the end of the round.
function displayEndingScreen(){ 
    currentScoreElement.textContent = "";
    resultElement.textContent = "";
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
       resultElement.textContent = "A draw!";
       resultElement.classList.remove("win","lose");

    } else {
        const playerWins =
            (playerSelection === "Rock" && computerSelection === "Scissors") ||
            (playerSelection === "Paper" && computerSelection === "Rock") ||
            (playerSelection === "Scissors" && computerSelection === "Paper");
        if (playerWins) {
            playerScore += 1;
            resultElement.textContent = "You win! ";
           //For applying CSS highlighting. Removing RED for LOSE, and adding GREEN for WIN
            resultElement.classList.remove("lose"); //
            resultElement.classList.add("win");
        } else {
            compScore += 1;
            resultElement.textContent = "Computer wins! ";
            resultElement.classList.remove("win");
            resultElement.classList.add("lose");

        }
    }
}

        const icons = document.getElementById("icons");
        icons.addEventListener("click", function(e) {
            if (!gameInProgress) { // Prevents game from continuing if not in progress.
                return; 
        }

        const clickedImage = e.target;
        const playerSelection = clickedImage.alt;
        const computerSelection = getComputerChoice();
        
        play = playRound(playerSelection, computerSelection);
        currentScoreElement.textContent = "Current score: You- " + playerScore + ", Computer- " + compScore;
        chosenIconElement.textContent = "Computer chose " + computerSelection ;
        
        if (playerScore==5 || compScore==5) {
            displayEndingScreen();

            if (playerScore==5){
                finalScoreElement.textContent = "Final scores - You: " + playerScore + ", Computer: " + compScore;
                finalWinnerElement.textContent = "You won!";

            } else {
                finalScoreElement.textContent = "Final scores - You: " + playerScore + ", Computer: " + compScore;
                finalWinnerElement.textContent = "Computer won! Better luck next time...";

        }
        gameInProgress = false; 
        setTimeout(resetGame, 2500);

        } 

}); 

    
resetGame();





















