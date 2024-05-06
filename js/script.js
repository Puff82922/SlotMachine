let bet = 0;
let totalBalance = 0;

// creates the default table to display when page loads 
function defaultTable(){
  let column1 = `<table><tr><td><figure><img src="img/cherry.png" width = "200" height = 150" alt="first"></figure><td></tr></table>`
  document.querySelector("#first").innerHTML = column1;
  let column2 = `<table><tr><td><figure><img src="img/gold.png" width = "200" height = "150" alt="second"></figure><td></tr></table>`
  document.querySelector("#second").innerHTML = column2;
  let column3 = `<table><tr><td><figure><img src="img/seven.png" width = "200" height = "150" alt="third"></figure><td></tr></table>`
  document.querySelector("#third").innerHTML = column3;
}
defaultTable();

// allows video to be played in background
playVideo();
function playVideo(){
  console.log("background video");
  document.querySelector("#confetti").innerHTML = `<source src="video/confetti.mp4" type="video/mp4">`  
  document.querySelector("#confetti").load();
}

// shuffle the icons randomly
function shuffle(){
  let iconArray = ["img/cherry.png", "img/gold.png", "img/seven.png"];
  iconArray = _.shuffle(iconArray);
  return iconArray[0];
}

// values to allow for scoring 
  let scoreValue1;
  let scoreValue2;
  let scoreValue3;

// displays the table after the icons have been shuffled 
function createTable(){
  let value1 = shuffle();
  scoreValue1 = value1;
  let value2 = shuffle();
  scoreValue2 = value2;
  let value3 = shuffle();
  scoreValue3 = value3;
  let column1 = `<table><tr id=firstSpin><td><figure><img src= ${value1} width = "200" height = "150" alt="first"></figure><td></tr></table>`
  document.querySelector("#first").innerHTML = column1;
  let column2 = `<table><tr id="secondSpin"><td><figure><img src=${value2} width = "200" height = "150" alt="second"></figure><td></tr></table>`
  document.querySelector("#second").innerHTML = column2;
  let column3 = `<table><tr id="thirdSpin"><td><figure><img src=${value3} width = "200" height = "150" alt="third"></figure><td></tr></table>`
  document.querySelector("#third").innerHTML = column3;
  scoring();
}


// assignning functions to buttons
document.querySelector("#spin").addEventListener("click", createTable);
document.querySelector("#x1").addEventListener("click", bet1);
document.querySelector("#x3").addEventListener("click", bet3);
document.querySelector("#x5").addEventListener("click", bet5);
document.querySelector("#restart").addEventListener("click", refresh);
document.querySelector("#submitBtn").addEventListener("click", getBalance);

// get balance from user and assigns it as the value of the balance
function getBalance() {
  let inputVal = document.getElementById("balanceEntered").value;
  if (isNaN(inputVal)) {
    alert("Please enter numbers only");
    return
  }
  totalBalance = parseFloat(inputVal);
  document.getElementById("balanceAmount").textContent = totalBalance;
  // hides textbox
  let textBox = document.getElementById("balanceEntered");
  textBox.style.display = "none";
  let submitBtn = document.getElementById("submitBtn");
  submitBtn.style.display = "none";
}

let amount = bet;
let lost = 0;

// if icons are all the same, amount is multiplied by the respective amount and bet
function scoring(){
  if ((scoreValue1 == scoreValue2) && (scoreValue2 == scoreValue3)) {
    if(scoreValue1 == "img/gold.png"){
      amount = bet * 10;
      document.querySelector("#score").innerHTML = `<h3 class="winner">Winner!!!</h3> <h3><strong> Score: $${amount}<strong></h3>`;
      balanceAdd(amount);
    }
     else if(scoreValue1 == "img/seven.png"){
      amount = bet * 5;
      document.querySelector("#score").innerHTML = `<h3 class="winner">Winner!!!</h3> <h3><strong> Score: $${amount}<strong></h3>`;
       balanceAdd(amount);
     }
     else if(scoreValue1 == "img/cherry.png"){
      amount = bet * 3;
      document.querySelector("#score").innerHTML = `<h3 class="winner">Winner!!!</h3> <h3><strong> Score: $${amount}</strong></h3>`;
      balanceAdd(amount);
     }
    
  }
    // Displays sorry message when icons do not match up
  else {
    document.querySelector("#score").innerHTML = `<h3 class="sorry"><strong><em>Sorry, try again!</strong></em></h3> <h3><strong> Score: $${lost}</strong></h3>`;
    balanceMinus(bet);
  }
}

// assigns the bet amount based on the button selected 
function bet1(){
  document.querySelector("#betAmount").innerHTML = `<h3><strong>Betting: $${10}</strong></h3>`
  bet = 10;
}

function bet3(){
  document.querySelector("#betAmount").innerHTML = `<h3><strong>Betting: $${30}</strong></h3>`
  bet = 30;
}
function bet5(){
  document.querySelector("#betAmount").innerHTML = `<h3><strong>Betting: $${50}</strong></h3>`
  bet = 50;
}

// adds the bet amount to the total balance when there is a winning spin
function balanceAdd(bet){
  totalBalance = totalBalance + bet;
  document.querySelector("#balance").innerHTML = `<h3><strong>Balance: $${totalBalance} </strong></h3>`;
}
// subtracts the bet amount to the total balance when there is a losing spin
function balanceMinus(bal){
  totalBalance = totalBalance - bet;
  if(totalBalance <= 0){
    // asks user to restart game when balance has ran out
    document.querySelector("#balance").innerHTML = `<h3 class="sorry"><strong><em> Sorry balance is too low. Please restart the game.</em></strong>`;
  }
  else {
  document.querySelector("#balance").innerHTML = `<h3><strong>Balance: $${totalBalance}<strong></h3>`;
  }
}

// reload page which sets values back to defaults
function refresh(){
  location.reload();
}
