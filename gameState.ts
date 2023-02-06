import { Board } from "./board";
import { Cell } from "./cell";
import { Snake } from "./snake";

export type GameState = {
    snake: Snake;
    board: Board;
    walls: Cell[];
    apple: Cell | null;
    score: number;
    tick: number;
};
