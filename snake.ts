import { GameConfig } from "./gameConfig";
import { Cell } from "./cell";
export class Snake {
    bodyParts: Cell[];
    get head(): Cell { return this.bodyParts[0]; }
    size: number;
    private direction: Direction;
    maxX: number;
    maxY: number;

    constructor(direction: Direction, gameConfig: GameConfig) {
        this.maxX = gameConfig.board.width;
        this.maxY = gameConfig.board.height;
        this.direction = direction;
        this.size = Math.ceil(gameConfig.board.width / 2);
        this.bodyParts = [new Cell(0, Math.floor(gameConfig.board.height / 2))];
        while (this.bodyParts.length < this.size) {
            this.addHead();
        }
    }

    move() {
        while (this.bodyParts.length >= this.size) {
            this.bodyParts.pop();
        }
        this.addHead();
    }

    addHead() {
        const currentHead = this.bodyParts[0];
        const xDiff =
            this.direction == Direction.right ? 1 :
                this.direction == Direction.left ? -1 :
                    0;
        const yDiff =
            this.direction == Direction.up ? -1 :
                this.direction == Direction.down ? 1 :
                    0;
        const newHead = new Cell(currentHead.x + xDiff, currentHead.y + yDiff);
        if (newHead.x >= this.maxX) {
            newHead.x = newHead.x - this.maxX;
        }
        if (newHead.y >= this.maxY) {
            newHead.y = newHead.y - this.maxY;
        }
        if (newHead.x < 0) {
            newHead.x = this.maxX - 1;
        }
        if (newHead.y < 0) {
            newHead.y = this.maxY - 1;
        }
        this.bodyParts.unshift(newHead);
    }

    setDirection(direction: Direction) {
        if (this.getAxis(direction) != this.getAxis(this.direction))
            this.direction = direction;
    }
    getAxis(direction: Direction): Axis {
        return direction == Direction.up || direction == Direction.down ?
            Axis.vertical :
            Axis.horizontal;
    }
}

export enum Direction {
    up,
    down,
    left,
    right
}
export enum Axis {
    horizontal,
    vertical
}