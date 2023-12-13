/**
* @jest-environment jsdom
*/

const { Game } = require('./script');

describe("Testing Game Class", () => {
    let game;

    describe("Testing Game Constructor", () => {
        beforeEach(() => {
            game = new Game(3, 3, 3);
        });

        test("The Game class initializes with the correct score value", () => {
            expect(game.getScore()).toBe(3);
        });
        test("The Game class initializes with the correct level value", () => {
            expect(game.getLevel()).toBe(3);
        });
        test("The Game class initializes with the correct lives value", () => {
            expect(game.getLevel()).toBe(3);
        });
        test("The Game class initializes with no generated squares", () => {
            expect(game.getGeneratedSquares()).toEqual([]);
        });
        test("The Game class initializes with no selected squares", () => {
            expect(game.getSelectedSquares()).toEqual([]);
        });
    });

    describe("Testing Game Setter Methods", () => {
        beforeEach(() => {
            game = new Game(10, 5, 1);

            document.body.innerHTML = `
                <div id="score">Score: 0</div>
                <div id="lives">Lives: 0</div>
            `;
        });

        test("The setter method for generated squares correctly changes the generated squares property", () => {
            game.setGeneratedSquares([5, 7, 9]);
            expect(game.getGeneratedSquares()).toEqual([5, 7, 9]);
        });
        test("The setter method for selected squares correctly changes the selected squares property", () => {
            game.setSelectedSquares([1, 3, 4]);
            expect(game.getSelectedSquares()).toEqual([1, 3, 4]);
        });
        test("The Score setter method correctly changes the #score element", () => {
            game.setScore();
            expect(document.getElementById("score").innerHTML).toEqual("Score: 10");
        });
        test("The Lives setter method correctly changes the #lives element", () => {
            game.setLives();
            expect(document.getElementById("lives").innerHTML).toEqual("Lives: 1");
        });
    });

    describe("Testing Start Game Method", () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="col-sm-12 game-display shadow">
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
                    </div>
                </div>
            `;
        });

        test("The start game method removes score-card siblings", () => {
            game.startGame();
            const scoreCard = document.getElementById("score-card");
            expect(scoreCard.nextElementSibling).toBeNull();
            expect(scoreCard.previousElementSibling).toBeNull();
        });
        test("The start game method changes the background color of game-display to white", () => {
            game.startGame();
            let gameDisplay = document.getElementsByClassName("game-display")[0];
            expect(gameDisplay.style.backgroundColor).toBe("white");
        });
    });
});