let container = document.querySelector(".contaner");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let draw = document.querySelector(".draw")

let turnO = true; //playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  container.classList.remove("hide");
  resetBtn.classList.remove("hide");
  draw.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("playerO")
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("playerX")
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("playerO", "playerX");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congo! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  container.classList.add("hide");
  resetBtn.classList.add("hide");
};

const showDraw = () => {
  draw.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  //checking Draw
  let isDraw = true;
  for(let box of boxes){
    if(box.innerText === ""){
      isDraw = false;
      break;
    }
  }

  if(isDraw){
    showDraw();
    return;
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
