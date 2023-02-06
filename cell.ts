export class Cell {
    constructor(public x: number, public y: number) { }
    equals(cell: Cell | null): boolean {
        return cell != null && cell.x == this.x && cell.y == this.y;
    }
}