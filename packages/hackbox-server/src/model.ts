import { FrequencyGame } from "./frequencyGame";

/**
 * A player of a hackbox game.
 */
export class Player {
    public isReady: boolean;
    public score: number;

    constructor(
        public id: string,
        public socketId: string,
        public name: string,
    ) { 
        this.isReady = false;
        this.score = 0;
    }
}

/**
 * A room that hosts a game.
 */
export class Room {
    players: Player[];
    private activeGame!: ActiveGame;

    constructor(
        public id: string,
        public socketId: string,
        public maxPlayers: number,
    ) {
        this.players = [];
    }

    getPlayer(playerId: string): Player {
        const player = this.players.find(player => {
            return player.id == playerId;
        });

        if(player == null) {
            throw Error('Player not found.');
        }

        return player;
    }

    initActiveGame(gameType: string) {
        switch(gameType) {
            case 'frequency':
                this.activeGame = new FrequencyGame(this.players);
                break;
            default:
                throw Error('Game type not found.');
        }
    }

    getActiveGame(): ActiveGame {
        return this.activeGame;
    }
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