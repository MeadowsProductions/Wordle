const endingPhaze = document.getElementById("endingPhaze");
const streakElement = document.getElementById("streak");
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let streak = 0;
if(localStorage.getItem("streak")){
  streak = parseInt(localStorage.getItem("streak"));
  streakElement.innerText = "Streak: " + streak;
}
function generateSecretWord() {
  const words = ["happy", "later", "sound", "dream", "plant", "cloud", "feast", "smart","fancy", "grape", "crane", "piano", "wrist", "zebra", "inbox", "crisp","frost", "blink", "bumpy", "shark", "juicy", "ocean", "tiger", "blush","lucky", "jumbo", "plumb", "vivid", "yacht", "fable", "quake", "nymph","pound", "chime", "whale", "quirk", "quiet", "glide", "baker", "knife","toast", "flock", "power", "quilt", "quark", "scale", "table", "slate","globe", "round", "sting", "quart", "swirl", "frown", "peace", "badge","plume", "eager", "arrow", "swarm", "liver", "flour", "shrub", "fairy","jelly", "spout", "scoop", "grain", "merry", "sleet", "bloom", "creek","plush", "toxin", "quick", "faint", "crawl", "boost", "swipe", "swing","frost", "spike", "twine", "scope", "flock", "knack", "proud", "beast","slope", "fable", "blink", "probe", "shift", "skate", "route", "frown","shame", "crown", "green", "spark", "flock", "dream", "shock", "spill","glide", "glaze", "slick", "flash", "swank", "chime", "braid", "ferry","flame", "wrack", "glass", "smile", "graze", "crush", "plumb", "bluff","frost", "twist", "swing", "track", "green", "slime", "swamp", "round","shift", "prize", "plume", "quest", "flick", "swank", "blush", "smash","plush", "flash", "front", "grind", "flock", "clank", "proud", "twist","clash", "liver", "green", "crave", "prize", "scope", "slide", "flash","blunt", "swing", "quest", "swirl", "blink", "blast", "braid", "grasp","slick", "sword", "storm", "swift", "route", "bluff", "beast", "pluck","spike", "swamp", "swift", "brave", "plume", "smile", "skate", "wrack","front", "chime", "glaze", "ferry", "frost", "spark", "scope", "magic","beach", "fable", "snack", "train", "blimp", "chart", "bless", "trunk","plant", "graze", "swipe", "quake", "flame", "crown", "glass", "scope","quart", "flash", "swift", "quiet", "slate", "grasp", "probe", "wrist","swarm", "spark", "front", "badge", "scale", "sword", "swift", "green","smart", "shock", "beast", "pluck", "fable", "quest", "twine", "bluff","shine", "magic", "spill", "blink", "slide", "flash", "peace", "swift","spike", "shame", "glass", "quirk", "spark", "track", "prize", "swift","twist", "blade", "spout", "storm", "table", "crane", "green", "blink","crisp", "cloud", "swift", "knife", "front", "juicy", "flash", "swing","flock", "crush", "spark", "pound", "quiet", "swamp", "flash", "prize","track", "green", "pluck", "flash", "globe", "spike", "beast", "swift","flash", "plant", "juicy", "twist", "swift", "glass", "flock", "probe","frost", "spark", "badge", "swift", "glaze", "track", "blink", "crane","quiet", "sword", "swift", "fable", "front", "blink", "spike", "flash","peace", "swift", "globe", "swift", "flash", "table", "front", "spark"];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Function to check if the guess is valid (has five letters)
function isValidGuess(guess) {
  return /^[a-z]{5}$/.test(guess);
}

// Function to reset the game
function resetGame() {
  // Clear previous guesses and generate a new secret word
  previousGuesses.length = 0;
  secretWord = generateSecretWord();
  document.getElementById('guessInput').value = '';
  document.getElementById('feedback').innerHTML = '';
  document.querySelector(".game-end").style.opacity = "0";
  document.querySelector(".game-end").style.visibility = "hidden";
  for(i = 0; i < alphabet.length; i++){
    document.getElementById(alphabet[i]).setAttribute("class", "");
  }
}

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  // Check if the guess is valid and has five letters
  if (!isValidGuess(guess)) {
    alert("Please enter a valid five-letter word.");
    return;
  }

  // Check if the word has already been guessed
  if (previousGuesses.includes(guess)) {
    alert("You've already guessed that word!");
    return;
  }
  previousGuesses.push(guess);

  const feedbackDiv = document.getElementById('feedback');
  let feedbackText = '';
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secretWord[i]) {
      feedbackText += `<span class="correct">${guess[i].toUpperCase()}</span>`;
      document.getElementById(guess[i].toLowerCase()).classList.add("correctPlace");
    } else if (secretWord.includes(guess[i])) {
      feedbackText += `<span class="incorrect">${guess[i].toUpperCase()}</span>`;
      document.getElementById(guess[i].toLowerCase()).classList.add("letterIncluded");
    } else {
      feedbackText += `<span>${guess[i].toUpperCase()}</span>`;
      document.getElementById(guess[i].toLowerCase()).classList.add("notIncluded");
    }
  }

  // Display the feedback
  feedbackDiv.innerHTML = feedbackDiv.innerHTML + feedbackText + "<br>";
  if (guess === secretWord.toLowerCase()) {
    endingPhaze.innerText = "Congratulations, You won!";
    document.getElementById("furtherInfo").innerHTML = "The word was <span class='bold'>" + secretWord + ".</span>";
    document.querySelector(".game-end").style.opacity = "1";
    document.querySelector(".game-end").style.visibility = "visible";
    streak++;
    localStorage.setItem("streak", streak);
    streakElement.innerText = "Streak: " + streak;
    return false;
  } else if (previousGuesses.length === 6 && feedbackText !== secretWord) {
    endingPhaze.innerText = "You ran out of guesses..";
    document.getElementById("furtherInfo").innerHTML = "The word was <span class='bold'>" + secretWord + ".";
    document.querySelector(".game-end").style.opacity = "1";
    document.querySelector(".game-end").style.visibility = "visible";
    streak = 0;
    streakElement.innerText = "Streak: " + streak;
    localStorage.setItem("streak", streak);
  }
}

// Array to hold previous guesses
const previousGuesses = [];

// Define the secret word
let secretWord = generateSecretWord();

alphabet.forEach(char => document.getElementById(char).addEventListener("click", () => {
    let inputElement = document.getElementById("guessInput");
    if(inputElement.value.length === 5){
        return false;
    }
    inputElement.value += char;
    let input = document.getElementById("guessInput").value;
    let inputArray = input.split(",");
    for (let i = 0; i < inputArray.length; i++) {
        inputArray[i] = inputArray[i].charAt(0).toUpperCase() + inputArray[i].slice(1);
    }
    let result = inputArray.join(" ");
    document.getElementById("guessInput").value = result;
}))

document.getElementById("backspace").addEventListener("click", () => {
    let inputElement = document.getElementById("guessInput");
    input = inputElement.value.split("");
    input[input.length-1] = "";
    inputElement.value = input.join("");
})

document.getElementById("continue").addEventListener("click", resetGame)
document.addEventListener("keydown", (event) => {
    let inputElement = document.getElementById("guessInput");
    let key = event.key;
    if(key === "Enter"){
        checkGuess();
        return false;
    }
    if(key === "Backspace"){
        let inputElement = document.getElementById("guessInput");
        let input = inputElement.value.split("");
        input[input.length-1] = "";
        inputElement.value = input.join("");
        return false;
    }
    if(key === "Spacebar"){
      resetGame();
    }
    for(i = 0; i < alphabet.length; i++){
        if(alphabet[i] === key){
            if(inputElement.value.length === 5){
                return false;
            }
            inputElement.value = inputElement.value + key;
            let input = document.getElementById("guessInput").value;
            let inputArray = input.split(",");
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i] = inputArray[i].charAt(0).toUpperCase() + inputArray[i].slice(1);
            }
            let result = inputArray.join(" ");
            document.getElementById("guessInput").value = result;
        }
    }
})