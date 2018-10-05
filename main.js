(function(){
    $('#hangTitle').effect("bounce", {times:3, distance:200}, 3000);

    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const diff = ["Easy", "Intermediate", "Hard"];
    const wordBankEasy = ["chicken","lemon","beef","lime","juice","eggs","noodles"];
    const wordBankInter = ["scampi", "pancakes","biscuits","ravioli","lunchables"];
    const wordBankHard =["guacamole","enchilladas","sandwich"];
    let letterArea = document.getElementById("letterArea");
    let usedLetterArea = document.getElementById("usedLetterBox");
    let difficultArea = document.getElementById("diffArea");
    let hangArea = document.getElementById("rightSide");
    let lifeBox = document.getElementById("lifeCountBox");
    let gameOver = document.getElementById("gameOver");
    let currWordBox = document.getElementById("currentBox")
    let currentGuess = document.getElementsByClassName("alphabetLetters");
    //let gameLives;
    let guesses = []; 
    let currentWord, currentSolution, letterCounter, gameLives; 

    let updateAlphabet=(arr)=>{
        let alpha = [...arr]
        for(let i=0; i<alpha.length; i++){
            var node = document.createElement("li");
            node.innerHTML = alpha[i];
            node.className ='alphabetLetters';
            node.addEventListener("click", selectLetter);
            letterArea.appendChild(node);
        }
    }; //end of printalpha function
        function selectLetter(){
        let alpha = [...alphabet];
        let guess = alpha.splice(alpha.indexOf(this.innerHTML), 1);
        checkGuess(this.innerHTML,currentWord,currentSolution);
        guesses.push(guess);
        printUsedLetters(guesses);
        letterArea.removeChild(this);
    };
    let printUsedLetters=(arr)=>{
        let used = [...arr]; 
        $('#usedLetterBox').empty();
    for(let i=0; i<used.length; i++){
        var usedLetter = document.createElement("ul");
        usedLetter.innerHTML = used[i];
        usedLetter.className = 'usedLetters';
        usedLetterArea.appendChild(usedLetter);
    }
    }; //end 
    let choosenWord=(arr)=>{
        let answer = Math.floor(Math.random() * arr.length); 
        return arr[answer]; 
    };
    let generateAnswerArr=(arr)=>{
        let emptyArr = [...arr];
        for(let i=0; i<emptyArr.length; i++){
            emptyArr[i] = "_";
        }
        letterCounter = emptyArr.length;
        return emptyArr;
    };
    //answer is the empty array!
    let checkGuess=(guess, answer, solution)=>{
        for(let i=0; i<solution.length; i++){
            if(guess == solution[i]){
                answer[i] = guess.toString();
                letterCounter--;
            }
        
        }
        checkLettersLeft(letterCounter);

        let checkWrong = solution.indexOf(guess);
        if(checkWrong == -1){
            gameLives--;
            checkAlive(gameLives);
        }
        $("#rightSide").empty();
        updateCurrentWord(answer);
    };
    let checkAlive=(lives)=>{
        $('#lifeCountBox').empty();
        let lifeSub = document.createElement("span");
        lifeSub.innerHTML = "Remaining Lives:";
        lifeBox.appendChild(lifeSub);
        let lifeCount = document.createElement("span");
        lifeCount.innerHTML = lives;
        lifeBox.appendChild(lifeCount);
        if(lives <= 0){
            $('#letterArea').hide();
            $('#gameArea').hide();
            printGameOver();
        };
    };
    let printGameOver=()=>{
        $('#gameOver').fadeIn(1000);
        $('.alphabetLetters').empty().hide();
        $('#usedLetterBox').empty();
        let title = document.createElement("h4");
        title.innerHTML = "Would you like to play again?";
        gameOver.appendChild(title);
        let choices = ["Yes", "No"];
        for(let i =0; i <choices.length; i++){
            let options = document.createElement("ul");
            options.innerHTML = choices[i];
            options.className = 'gameOverOptions';
            gameOver.appendChild(options);
            options.onclick = function(){
                if(this.innerHTML === "Yes"){
                    $('.gameOverOptions').hide().fadeOut(1000);
                    $('#gameOver').empty().fadeOut(1000);
                    printDifficult();
                }
                else if(this.innerHTML === "No"){
                    $('.gameOverOptions').hide().fadeOut(1000);
                    title.innerHTML = "Hope you enjoyed this game!";
                }
            };
        }
    };
    let checkLettersLeft=(count)=>{
        if(count == 0){
        $('#gameArea').hide();   
        let win = document.createElement("h3");
        win.className = 'winMessage';
        win.innerHTML = `Congratulations! Your word was: ${currentSolution}`; 
        gameOver.appendChild(win);   
         printGameOver();
        }
    };
    let checkDiff = (diff) =>{
        if(diff == "Easy"){
            gameLives = 9;
            return wordBankEasy;
        }
        else if (diff == "Intermediate"){
            gameLives = 7;
            return wordBankInter;
        }
        else if(diff == "Hard"){
            gameLives = 6;
            return wordBankHard;
        }
    };
    let updateCurrentWord=(answer)=>{
        for(let i=0; i<answer.length; i++){
            let sol = document.createElement("ul");
            sol.innerHTML = currentWord[i];
            sol.className = 'letters';
            hangArea.appendChild(sol);
        }
    };
    let printDifficult=()=>{
        $("#diffArea").empty().show();
        $('.letters').empty();
        $('#usedLetterBox').empty();
        guesses = [];
        for(let i=0; i<diff.length; i++){
            let diffSelect = document.createElement("ul");
             diffSelect.innerHTML = diff[i];
             diffSelect.className = 'diffSel';
             difficultArea.appendChild(diffSelect);
             diffSelect.onclick = function(e){
                 difficultArea.style.display = 'none';
                 checkDiff(this.innerHTML);
                 play(this.innerHTML);                         
             };
         }
    }
    let play = (diff) =>{
         $('#letterArea').hide().fadeIn(1000);
         $('#gameArea').fadeIn(1000);
            currentSolution = choosenWord(checkDiff(diff));
            currentWord = generateAnswerArr(currentSolution);
            updateCurrentWord(currentWord);
            updateAlphabet(alphabet);
            checkAlive(gameLives);
    };
    printDifficult();
    
})();