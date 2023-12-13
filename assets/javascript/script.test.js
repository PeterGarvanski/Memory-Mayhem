/**
* @jest-environment jsdom
*/

const { Game } = require('./script');

describe("Testing Game Class", () => {
    let game;

    describe("Testing Game Constructor", () => {
        beforeEach(() => {
            // Initialize a new Game instance before each test
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
            // Initialize a new Game instance before each test
            game = new Game(10, 5, 1);

            // Mock the HTML elements
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
});