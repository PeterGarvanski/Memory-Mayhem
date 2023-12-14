// Uncomment the line below for your Tests to run
// const $ = require('jquery');

class Game {
    constructor(score, level, lives) {
        this.score = score;
        this.level = level;
        this.lives = lives;
        this.generatedSquares = [];
        this.selectedSquares = [];
        this.wrongSquares = []
    }

    // Getter for the score property
    getScore() {
        return this.score;
    };

    // Getter for the level property
    getLevel() {
        return this.level;
    };

    // Getter for the lives property
    getLives() {
        return this.lives;
    };

    // Getter for the generatedSquares property
    getGeneratedSquares() {
        return this.generatedSquares;
    };

    // Getter for the selectedSquares property
    getSelectedSquares() {
        return this.selectedSquares;
    };

    // Setter for the score property
    setScore() {
        $("#score").empty().append('Score: ' + this.score);
    };

    // Setter for the lives property
    setLives() {
        $("#lives").empty().append('Lives: ' + this.lives);
    };

    // Setter for the generatedSquares property
    setGeneratedSquares(array) {
        this.generatedSquares = array;
    };

    // Setter for the selectedSquares property
    setSelectedSquares(array) {
        this.selectedSquares = array;
    };


    // Clears the game display
    startGame() {
        $("#score-card-box").siblings().remove();
        $(".game-display").css("background-color", "white");
    };

    // Displays a grid of squares based on the level you are at
    displayBuilder() {
        let startHtml = `<div class="center center-box"><div class="row box-display"></div></div>`;
        let allBoxes = ``;

        let scoreCard = $("#score-card-box");
        scoreCard.after(startHtml);

        let boxDisplay = $(".box-display");
        boxDisplay.css("grid-template-columns", `repeat(${this.level}, 1fr)`);
        boxDisplay.css("grid-template-rows", `repeat(${this.level}, 1fr)`);

        // Uses the level number to generate the required amount of boxes
        for (let i = 0; i < this.level * this.level; i++) {
            allBoxes += `<div class="box shadow" id="${i + 1}"></div>`;
        }

        boxDisplay.append(allBoxes);
    };

    // Selects random squares based on the score property to flash and unflash
    async squareGenerator() {

        return new Promise((resolve) => {
            for (let i = 0; i < this.score; i++) {
                let boxID = Math.floor(Math.random() * (this.level * this.level) + 1);

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
            }, 3000);
        });
    }

    async playerTurn() {
        return new Promise((resolve) => {
            let clickedSquares = 0;
            const self = this;

            // Function for the users Click
            function handleClick() {
                let boxID = parseInt($(this).attr('id'));

                // If the user has selected the required amount of squares turn the click function off
                if (clickedSquares >= self.score) {
                    $(".box").off("click", handleClick);
                }

                // If the user runs out of lives end users turn
                else if (self.wrongSquares.length >= 3) {
                    $(".box").off("click", handleClick);
                    resolve();
                    return;
                }

                // If the user selects the same square ignore the input
                else if (self.selectedSquares.includes(boxID) || self.wrongSquares.includes(boxID)) {
                    return;
                }

                else {
                    // If the user selects the right square increment the count and add selected class
                    if (self.generatedSquares.includes(boxID)) {
                        $(this).toggleClass("selected");
                        self.selectedSquares.push(boxID);
                        clickedSquares++;
                    }
                    // If the user selects the right square increment the wrong choice count, remove a life and add selected class
                    else {
                        $(this).toggleClass("wrong-choice");
                        self.wrongSquares.push(boxID);
                        self.lives--;
                        self.setLives();
                        console.log(self.wrongSquares.length);
                    }
                }
            }

            $(".box").on("click", handleClick);

            // Resolve the promise when the player's turn is completed
            $(".box").on("click", function checkScore() {
                if (clickedSquares >= self.getScore()) {
                    $(".box").off("click", handleClick);
                    $(".box").off("click", checkScore);
                    resolve();
                }
            });
        });
    }

    comparator() {
        // Sorts both arrays
        let arr1 = this.getGeneratedSquares().slice().sort();
        let arr2 = this.getSelectedSquares().slice().sort();

        // If arrays are equal, increments score by 1
        if (arraysAreEqual(arr1, arr2)) {
            this.score++;
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

    // Updates score evey iteration and level every multiple of 5
    levelIncrementor() {
        if (this.score % 5 === 0) {
            this.level++;
        }

        this.setScore();
        this.setLives();
    }

    // Returns the html back to its original state
    endGame() {
        let html = `
        <div class="row" id="score-card-box">
            <div id="score-card">
                <h1 class="score-text" id="score">Score: 0</h1>
                <h1 class="score-text" id="lives">Lives: 0</h1>
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
        $(".game-display").removeAttr("style");
    }
}

async function gameSequence() {
    const user = new Game(3, 3, 3);
    user.setScore();
    user.setLives();

    while (user.getLives() > 0) {
        user.startGame();
        user.displayBuilder(user.getLevel());
        user.setGeneratedSquares([]);
        user.setSelectedSquares([]);
        await user.squareGenerator();
        await user.playerTurn();
        user.comparator();
        user.levelIncrementor();
    }

    user.endGame();
}

$(document).on("click", "#start-button", gameSequence);

// Uncomment the line below for Tests to run
// module.exports = { Game };