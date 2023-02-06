import { Cell } from "./cell";
import { GameConfig, BoardConfig } from "./gameConfig";
import { GameState } from "./gameState";

export class Board {
    readonly ctx: CanvasRenderingContext2D;
    config: BoardConfig;
    cells: CellType[][];

    constructor(gameConfig: GameConfig) {
        this.config = gameConfig.board;
        this.ctx = this.getContext();
    }

    getContext(): CanvasRenderingContext2D {
        const canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.setAttribute("width", (this.config.width * this.config.pixelsPerCell).toString());
        canvas.setAttribute("height", (this.config.height * this.config.pixelsPerCell).toString());
        return <CanvasRenderingContext2D>canvas.getContext("2d");
    }

    updateState(state: GameState) {
        this.clearState();
        this.updateCells(state.snake.bodyParts, CellType.snake);
        if (state.apple != null) {
            this.updateCells([state.apple], CellType.apple);
        }
        this.updateCells(state.walls, CellType.wall);
    }

    updateCells(cells: Cell[], cellType: CellType) {
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const x = cell.x;
            const y = cell.y;
            this.cells[x][y] = cellType;
        }
    }
    collide(p1: Cell, p2: Cell) {
        return p1.x == p2.x && p1.y == p2.y;
    }


    clearState() {
        this.cells = Array.from(Array(this.config.width), () => {
            return new Array(this.config.height).fill(CellType.empty)
        });
    }

    refresh(state: GameState) {
        this.updateState(state);
        this.drawBoard();
    }
    getCellType(cell: Cell): CellType {
        return this.cells[cell.x][cell.y];
    }

    private drawBoard() {
        for (let y = 0; y < this.config.height; y++) {
            for (let x = 0; x < this.config.width; x++) {
                this.paintCell(x, y);
            }
        }
    }

    private paintCell(x: number, y: number) {
        switch (this.cells[x][y]) {
            case CellType.snake:
                this.ctx.strokeStyle = "blue";
                this.ctx.fillStyle = "blue";
                break;
            case CellType.empty:
                this.ctx.strokeStyle = "lightgray";
                this.ctx.fillStyle = "white";
                break;
            case CellType.apple:
                this.ctx.strokeStyle = "green";
                this.ctx.fillStyle = "green";
                break;
            case CellType.wall:
                this.ctx.strokeStyle = "black";
                this.ctx.fillStyle = "black";
                break;
        }
        this.ctx.fillRect(x * this.config.pixelsPerCell, y * this.config.pixelsPerCell, this.config.pixelsPerCell, this.config.pixelsPerCell);
        this.ctx.strokeRect(x * this.config.pixelsPerCell, y * this.config.pixelsPerCell, this.config.pixelsPerCell, this.config.pixelsPerCell);
    }

    fill(x: number, y: number) {
        this.ctx.fillStyle = "blue";
        const pixels = this.config.pixelsPerCell;
        this.ctx.fillRect(x * pixels, y * pixels, pixels, pixels);
    }
}

export enum CellType {
    empty,
    snake,
    apple,
    wall
}