
export type GameConfig = {
    engine: EngineConfig;
    board: BoardConfig;
};
export type EngineConfig = {
    refreshInterval: number;
}

export type BoardConfig = {
    width: number;
    height: number;
    pixelsPerCell: number;
}

