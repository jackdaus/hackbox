import { Socket } from 'socket.io-client';
import { Room } from 'hackbox-server';
export declare class hackboxClient {
    socket: Socket;
    constructor(url: string);
    /**
    * Create a game room.
    * @returns the newly created room
    */
    createRoom(): Promise<Room>;
    /**
     * Registers a function to callback when a player joins a room.
     * @param callbackFn callback function when a player joins. The updated room is a parameter of the callback function.
     */
    onPlayerJoin(callbackFn: (room: Room) => void): void;
    /**
     * Triggers the start of the game.
     * @param roomId the room id of the room to start
     * @param gameType the type of game that will be played
     */
    startGame(roomId: string, gameType: string): void;
    /**
     * Gets all rooms on the hackbox-server.
     * @returns a promise that resolves all rooms on the hackbox server
     */
    getRooms(): Promise<Room[]>;
    /**
     * Adds a new player to an existing game room.
     * @param roomId the id of the room which the player will be added to
     * @param playerName the name of the new player
     * @returns the id of the newly created player
     */
    joinRoom(roomId: string, playerName: string): Promise<string>;
    /**
     * Registers a function to callback when a game begins
     * @param callbackFn callback function when a player joins. The game type is a parameter of the callback function.
     */
    onStartGame(callbackFn: (gameType: string) => void): void;
}
//# sourceMappingURL=index.d.ts.map