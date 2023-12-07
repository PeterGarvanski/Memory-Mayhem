function gameSequence() {
    let game = {
        level: 3,
        score: 0,
        highScore: 0,
        generatedSquares: [],
        selectedSquares: [],
        lives: 0
    };

    startGame();
    displayBuilder(game.level);
}

$("#start-button").click(gameSequence);

function startGame() {
    $("#score-card-box").siblings().remove();
    $(".game-display").css("background-color", "white");
}

function displayBuilder(level) {
    let startHtml = `<div class="center center-box"><div class="row box-display">`;
    let box = `<div class="box shadow"></div>`;
    let endHtml = `</div></div>`;
    let divAmount = ``;

    // Use the level number to generate the required amount of boxes
    for (let i = 0; i < level * level; i++) {
        divAmount += box;
    }

    // Clear existing content and append the generated divs to the display container
    let scoreCard = $("#score-card-box");
    scoreCard.after(startHtml); // Add the start HTML

    let boxDisplay = $(".box-display");
    boxDisplay.css("grid-template-columns", "repeat(" + level + ", 1fr)");
    boxDisplay.css("grid-template-rows", "repeat(" + level + ", 1fr)");
    boxDisplay.append(divAmount); // Append the generated divs
    boxDisplay.after(endHtml); // Add the end HTML
}

