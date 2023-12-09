class Game {
    
    constructor(score, highScore, level, lives) {
      this.score = score;
      this.highScore = highScore;
      this.level = level;
      this.lives = lives;
      this.generatedSquares = [];
      this.selectedSquares = [];
    }

    // Getter for the score property
    getScore() {
        return this.score
    };

    // Getter for the highScore property
    getHighScore() {
        return this.highScore
    };

    // Getter for the level property
    getLevel() {
        return this.level
    };

    // Getter for the lives property
    getLives() {
        return this.lives
    };

    getGeneratedSquares() {
        return this.generatedSquares
    };

    getSelectedSquares() {
        return this.selectedSquares
    };

    // Clears the game display
    startGame() {
        $("#score-card-box").siblings().remove();
        $(".game-display").css("background-color", "white");
    };
    
    // Displays a grid of squares based on the level you are at
    displayBuilder(level) {
        let startHtml = `<div class="center center-box"><div class="row box-display"></div></div>`;
        let allBoxes = ``;
        
        let scoreCard = $("#score-card-box");
        scoreCard.after(startHtml);
        
        let boxDisplay = $(".box-display");
        boxDisplay.css("grid-template-columns", `repeat(${level}, 1fr)`);
        boxDisplay.css("grid-template-rows", `repeat(${level}, 1fr)`);
    
        // Uses the level number to generate the required amount of boxes
        for (let i = 0; i < level * level; i++) {
            allBoxes += `<div class="box shadow" id="${i + 1}"></div>`;
        }

        boxDisplay.append(allBoxes);
    };

    // Selects random squares based on the score property to flash and unflash
    async squareGenerator(score, level) {
        return new Promise((resolve) => {
            for (let i = 0; i < score; i++) {
                let boxID = Math.floor(Math.random() * (level * level) + 1);

                if (this.generatedSquares.includes(boxID)) {
                    i--;
                } else {
                    $(`#${boxID}`).addClass("selected");
                    this.generatedSquares.push(boxID);
                }
            }

            setTimeout(() => {
                for (let box of this.generatedSquares) {
                    $(`#${box}`).removeClass("selected");
                }
                resolve(); // Resolve the promise after timeout
            }, 4000);
        });
    }

    async playerTurn(score) {
        return new Promise((resolve) => {
            let clickedSquares = 0;
            const self = this;

            function handleClick() {
                let boxID = parseInt($(this).attr('id'));
                
                if (clickedSquares >= score) {
                    $(".box").off("click", handleClick); // Remove the click event handler for all squares
                } else {
                    if (self.generatedSquares.includes(boxID)) {
                        $(this).toggleClass("selected");
                        self.selectedSquares.push(boxID);
                        clickedSquares++;
                    } 
                    else {
                        $(this).toggleClass("wrong-choice");
                        self.lives--;
                        clickedSquares++;
                    }
                }
            }

            $(".box").on("click", handleClick);

            // Resolve the promise when the player's turn is completed
            $(".box").on("click", function checkScore() {
                if (clickedSquares >= score) {
                    $(".box").off("click", handleClick);
                    $(".box").off("click", checkScore);
                    resolve(); // Resolve the promise
                }
            });
        });
    }

    comparator(generatedSquares, selectedSquares) {
        let arr1 = generatedSquares.slice().sort(); // Copy and sort generatedSquares
        let arr2 = selectedSquares.slice().sort(); // Copy and sort selectedSquares
    
        if (arraysAreEqual(arr1, arr2)) {
            this.score++;
            this.level++;
        }
    
        function arraysAreEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
    
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }
    
            return true;
        }
    }
    
    endGame() {
        let html = `
        <div class="row" id="score-card-box">
            <div id="score-card">
                <h1 class="score-text">Score: 0</h1>
                <h1 class="score-text">High Score: 0</h1>
            </div>
        </div>
        <div class="row center">
            <button id="start-button" class="shadow">
                <h1 class="start-button-content">Start Game!</h1>
            </button>
        </div>
        <div class="row">
            <div class="center">
                <p class="small-text">Please read the instruction below before starting to play!</p>
            </div>
        </div>`;
    
        $(".game-display").html(html);
    }    
}

async function gameSequence() {
    const user = new Game(3, 0, 3, 3);

    while (user.getLives() > 0) {
        user.startGame();
        user.displayBuilder(user.getLevel());
        await user.squareGenerator(user.getScore(), user.getLevel());
        await user.playerTurn(user.getScore());
        user.comparator(user.getGeneratedSquares(), user.getSelectedSquares());
        console.log(user.getLevel());
        console.log(user.getLives());
        }

    user.endGame()
}

$("#start-button").click(gameSequence);
