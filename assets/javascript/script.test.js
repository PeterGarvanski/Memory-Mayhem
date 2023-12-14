/**
* @jest-environment jsdom
*/

const { assertMemberExpression } = require('@babel/types');
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

    describe("Testing Display Builder Method", () => {
        beforeEach(() => {
            game = new Game(3, 3, 3);

            document.body.innerHTML = `
                <div class="row box-display">
                    <div class="row" id="score-card-box">
                        <div id="score-card">
                            <h1 class="score-text" id="score">Score: 0</h1>
                            <h1 class="score-text" id="lives">Lives: 0</h1>
                        </div>
                    </div>
                </div>
            `;
        });

        test("The display builder method creates the correct amount of squares", () => {
            game.displayBuilder();
            const element = document.getElementsByClassName("box-display")[0];
            lastChild = element.children[element.children.length -1];
            expect(lastChild.id).toBe("9");
        });
    });

    describe("Testing Square Generator Method", () => {
        beforeEach(() => {
            game = new Game(5, 3, 3);
        });

        test("The square generator method correctly selects the right amount of squares based upon score", () => {
            game.squareGenerator();
            expect(game.getGeneratedSquares().length).toBe(5);
        });
    });

    // describe("Testing Player Turn Method", () => {
    //     beforeEach(() => {
    //         game = new Game(5, 3, 3);
    //     });

    //     test("The square generator method correctly selects the right amount of squares based upon score", () => {
    //         game.squareGenerator()
    //         expect(game.getGeneratedSquares().length).toBe(5);
    //     });
    // });

    describe("Testing Comparator Method", () => {
        beforeEach(() => {
            game = new Game(8, 3, 3);
        });

        test("The comparator method correctly compares generated squares with selected squares", () => {
            game.setGeneratedSquares([1, 2, 3, 4, 5]);
            game.setSelectedSquares([1, 2, 3, 4, 5]);
            game.comparator();
            expect(game.getScore()).toBe(9);
        });
        test("The comparator method doesnt increment score when generated squares and selected squares are not equal", () => {
            game.setGeneratedSquares([1, 6, 3, 9, 5]);
            game.setSelectedSquares([1, 2, 3, 4, 5]);
            game.comparator();
            expect(game.getScore()).toBe(8);
        });
    });

    describe("Testing Level Incrementor Method", () => {
        beforeEach(() => {
            game = new Game(5, 3, 3);
        });

        test("The Level incrementor method correctly changes the level when the score reaches a multiple of 5", () => {
            game.levelIncrementor();
            expect(game.getLevel()).toBe(4);
        });
    });

    describe("Testing End Game Method", () => {
        beforeEach(() => {
            game = new Game(3, 3, 3);
            document.body.innerHTML = `<div class="col-sm-12 game-display shadow"></div>`;
        });
    
        test("The end game method correctly returns the HTML document to the correct state", () => {
            let gameDisplay = document.getElementsByClassName("game-display")[0];
            let html = 
            `
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
            `;
            game.endGame();
            let receivedHTML = gameDisplay.innerHTML;
            expect(receivedHTML == html);
        });

        test("The end game method removes the style attribute from game display", () => {
            let gameDisplay = document.getElementsByClassName("game-display")[0];
            game.endGame();
            expect(gameDisplay.css).toBeUndefined();
        })
    });
});