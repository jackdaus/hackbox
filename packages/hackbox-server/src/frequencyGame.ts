import { ActiveGame, Player, Room} from './model';

export class FrequencyGame implements ActiveGame {
  private freqPlayers: FrequencyPlayer[];
  /**
   * The current leader of the round.
   */
  private leaderIndex: number;
  public leftWord: string;
  public rightWord: string;
  public targetFrequency: number;
  public clueWord: string;
  
  constructor(
    players: Player[]
  ) { 
    this.leftWord = '';
    this.rightWord = '';
    this.targetFrequency = 0;
    this.clueWord = '';
    this.freqPlayers = this.initFreqPlayers(players);
    this.leaderIndex = 0;
  }

  getPlayer(playerId: string): FrequencyPlayer | undefined {
    return this.freqPlayers.find(player => player.id == playerId);
  }

  getLeader(): FrequencyPlayer {
    return this.freqPlayers[this.leaderIndex];
  }

  getClueWord(): string {
    return this.clueWord ?? 'Clue not set :(';
  }

  getFreqPlayers(): FrequencyPlayer[] {
    return this.freqPlayers;
  }

  private initFreqPlayers(players: Player[]): FrequencyPlayer[] {
    let returnVal: FrequencyPlayer[] = [];

    players.forEach(player => {
      let freqPlayer = new FrequencyPlayer(player);
      returnVal.push(freqPlayer);
    })

    return returnVal;
  }

}

export class FrequencyPlayer {
  public id: string;
  public name: string;
  public freqGuess: number;

  constructor(player: Player) {
    this.id = player.id;
    this.name = player.name; 
    this.freqGuess = 0;
  }
}