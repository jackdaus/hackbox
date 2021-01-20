/**
 * A player of a hackbox game.
 */
export declare class Player {
    id: string;
    socketId: string;
    name: string;
    isReady: boolean;
    score: number;
    constructor(id: string, socketId: string, name: string);
}
/**
 * A room that hosts a game.
 */
export declare class Room {
    id: string;
    socketId: string;
    maxPlayers: number;
    players: Player[];
    private activeGame;
    constructor(id: string, socketId: string, maxPlayers: number);
    getPlayer(playerId: string): Player;
    initActiveGame(gameType: string): void;
    getActiveGame(): ActiveGame;
}
export interface PlayerAction {
    roomId: string;
    playerId: string;
    action: GameReferenceAction;
}
/**
 * The logic for the games running on the hackboxServer.
 */
export interface GameReference {
    gamesTypes: string[];
    demo: GameReferenceDemo;
    actions: GameReferenceAction[];
}
/**
 * TBD.
 */
export interface GameReferenceDemo {
    gameLength: number;
    validActions: number[];
    description: string;
}
/**
 * An action that can be performed by players within a game.
 */
export interface GameReferenceAction {
    actionName: string;
    value: string;
    threshold: number;
}
/**
 * Root interface for all game types.
 */
export interface ActiveGame {
}
//# sourceMappingURL=model.d.ts.map