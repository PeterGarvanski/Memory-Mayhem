class Game {
    
    constructor(score, highScore, level, lives) {
      this.score = score;
      this.highScore = highScore;
      this.level = level
      this.lives = lives
      this.generatedSquares = []
      this.selectedSquares = []
    }

    getScore() {
        return this.score
    }

    getHighScore() {
        return this.highScore
    }

    getLevel() {
        return this.level
    }

    getLives() {
        return this.lives
    }

    startGame() {
        $("#score-card-box").siblings().remove();
        $(".game-display").css("background-color", "white");
    }
    
    displayBuilder(level) {
        let startHtml = `<div class="center center-box"><div class="row box-display"></div></div>`;
        let box = `<div class="box shadow"></div>`;
        
        // Clear existing content and append the start HTML
        let scoreCard = $("#score-card-box");
        scoreCard.after(startHtml);
        
        let boxDisplay = $(".box-display");
        boxDisplay.css("grid-template-columns", `repeat(${level}, 1fr)`);
        boxDisplay.css("grid-template-rows", `repeat(${level}, 1fr)`);
    
        // Use the level number to generate the required amount of boxes
        for (let i = 0; i < level * level; i++) {
            boxDisplay.append(box); // Append each box as a child of boxDisplay
        }
    }
    
}
    
function gameSequence() {
    const user = new Game(0, 0, 3, 3);
    user.startGame();
    user.displayBuilder(user.getLevel());
}
    
$("#start-button").click(gameSequence);
    
