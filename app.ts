import { Engine } from "./engine";
const game = new Engine({
    engine: {
        refreshInterval: 200
    },
    board: {
        width: 20,
        height: 20,
        pixelsPerCell: 40
    }
});
game.start();