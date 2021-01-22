import { Socket, io } from 'socket.io-client';
import { Room } from 'hackbox-server';
import { PlayerAction } from 'hackbox-server/dist/model';

export class hackboxClient {
  socket: Socket;

  constructor(url: string) {
    this.socket = io(url);
  }

  /**
  * Create a game room.
  * @returns the newly created room
  */
  createRoom(): Promise<Room> {
    return new Promise<Room>(resolve => {
      this.socket.emit('hb-createRoom');
      this.socket.on('hb-roomData', (room: Room) => {
        resolve(room);
      });
    });
  };

  /**
   * Registers a function to callback when a player joins a room.
   * @param callbackFn callback function when a player joins. The updated room is a parameter of the callback function. 
   */
  onPlayerJoin(callbackFn: (room: Room) => void): void {
    this.socket.on('hb-onPlayerJoin', (room: Room) => {
      callbackFn(room);
    });
  };

  /**
   * Triggers the start of the game. 
   * @param roomId the room id of the room to start
   * @param gameType the type of game that will be played
   */
  startGame(roomId: string, gameType: string): void {
    this.socket.emit('hb-startGame', { roomId, gameType });
  };

  /**
   * Gets all rooms on the hackbox-server.
   * @returns a promise that resolves all rooms on the hackbox server
   */
  getRooms(): Promise<Room[]> {
    return new Promise<Room[]>(resolve => {
      this.socket.emit('hb-getRooms');
      this.socket.on('hb-roomsData', (rooms: Room[]) => {
        resolve(rooms);
      });
    });
  }

  /**
   * Adds a new player to an existing game room.
   * @param roomId the id of the room which the player will be added to
   * @param playerName the name of the new player
   * @returns the id of the newly created player
   */
  joinRoom(roomId: string, playerName: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.socket.emit('hb-joinRoom', { roomId, playerName });
      this.socket.on('hb-roomConnectionSuccessful', (playerId: string) => {
        resolve(playerId);
      });
    });
  };

  /**
   * Registers a function to callback when a game begins
   * @param callbackFn callback function when a player joins. The game type is a parameter of the callback function. 
   */
  onStartGame(callbackFn: (gameType: string) => void): void {
    this.socket.on('hb-gameStart', (gameType: string) => {
      callbackFn(gameType);
    });
  };

  emitPlayerAction(action: PlayerAction) {
    this.socket.emit('hb-playerAction', action)
  }

  onGameEvent() {

  }
};