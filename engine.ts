import { Board, CellType } from "./board";
import { Cell } from "./cell";
import { GameConfig } from "./gameConfig";
import { GameState } from "./gameState";
import { Direction, Snake } from "./snake";
export class Engine {
    state: GameState;
    readonly config: GameConfig;
    readonly htmlElements: {
        tick: HTMLElement,
        score: HTMLElement,
    }
    constructor(gameConfig: GameConfig) {
        this.config = gameConfig;
        this.initialize();
        this.htmlElements = this.initalizeHtmlElements();
        document.addEventListener("keydown", this.changeDirection.bind(this));
    }
    initialize() {
        const snake = new Snake(Direction.right, this.config);
        const board = new Board(this.config);
        const walls = this.initWalls();
        const apple = null;
        this.state = {
            apple,
            board,
            walls,
            snake,
            score: 0,
            tick: 0
        };
        this.state.board.updateState(this.state);
    }
    initWalls(): Cell[] {
        const result: Cell[] = [];
        for (let i = 0; i < this.config.board.width; i++) {
            result.push(new Cell(i, 0));
            result.push(new Cell(i, this.config.board.height - 1));
        }
        return result;
    }
    initalizeHtmlElements(): {
        tick: HTMLElement,
        score: HTMLElement,
    } {
        return {
            tick: <HTMLElement>document.getElementById('tick'),
            score: <HTMLElement>document.getElementById('score')
        }
    }
    start() {
        this.onTick();
        setInterval(() => this.onTick(), this.config.engine.refreshInterval);
    }
    onTick() {
        this.state.snake.move();
        this.checkCollision();
        this.state.board.refresh(this.state);
        this.addApple();
        this.htmlElements.tick.innerHTML = `${this.state.tick}`
        this.htmlElements.score.innerHTML = `${this.state.score}`
        this.state.tick++;
    }
    checkCollision() {
        const cellType = this.state.board.getCellType(this.state.snake.head);
        if (cellType == CellType.apple) {
            this.state.apple = null;
            this.state.score++;
            this.state.snake.size++;
        }
        if (cellType == CellType.wall || cellType == CellType.snake) {
            this.gameOver();
        }
    }

    changeDirection(e: KeyboardEvent) {
        switch (e.code) {
            case "ArrowLeft":
                this.state.snake.setDirection(Direction.left);
                break;
            case "ArrowRight":
                this.state.snake.setDirection(Direction.right);
                break;
            case "ArrowUp":
                this.state.snake.setDirection(Direction.up);
                break;
            case "ArrowDown":
                this.state.snake.setDirection(Direction.down);
                break;
            case "Space":
                this.restart();
                break;
        }
    }
    restart() {
        if (window.confirm("restart")) {
            this.initialize();
        }
    }
    gameOver() {
        window.alert("Game over - Score : " + this.state.score);
        this.initialize();
    }
    addApple() {
        if (this.state.apple != null) {
            return;
        }
        let cell = this.randomCell();
        while (!(this.state.board.getCellType(cell) == CellType.empty)) {
            cell = this.randomCell();
        }
        console.log("set apple " + cell);
        this.state.apple = cell;
    }

    randomCell(): Cell {
        const x = Math.floor(Math.random() * this.config.board.width);
        const y = Math.floor(Math.random() * this.config.board.height);
        return new Cell(x, y);
    }
}

