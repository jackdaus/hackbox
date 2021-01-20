import { ActiveGame, Player } from './model';
export declare class FrequencyGame implements ActiveGame {
    private freqPlayers;
    /**
     * The current leader of the round.
     */
    private leaderIndex;
    leftWord: string;
    rightWord: string;
    targetFrequency: number;
    clueWord: string;
    constructor(players: Player[]);
    getPlayer(playerId: string): FrequencyPlayer | undefined;
    getLeader(): FrequencyPlayer;
    getClueWord(): string;
    getFreqPlayers(): FrequencyPlayer[];
    private initFreqPlayers;
}
export declare class FrequencyPlayer {
    id: string;
    name: string;
    freqGuess: number;
    constructor(player: Player);
}
//# sourceMappingURL=frequencyGame.d.ts.map