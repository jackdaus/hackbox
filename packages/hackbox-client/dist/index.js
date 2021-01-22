"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackboxClient = void 0;
var socket_io_client_1 = require("socket.io-client");
var hackboxClient = /** @class */ (function () {
    function hackboxClient(url) {
        this.socket = socket_io_client_1.io(url);
    }
    /**
    * Create a game room.
    * @returns the newly created room
    */
    hackboxClient.prototype.createRoom = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-createRoom');
            _this.socket.on('hb-roomData', function (room) {
                resolve(room);
            });
        });
    };
    ;
    /**
     * Registers a function to callback when a player joins a room.
     * @param callbackFn callback function when a player joins. The updated room is a parameter of the callback function.
     */
    hackboxClient.prototype.onPlayerJoin = function (callbackFn) {
        this.socket.on('hb-onPlayerJoin', function (room) {
            callbackFn(room);
        });
    };
    ;
    /**
     * Triggers the start of the game.
     * @param roomId the room id of the room to start
     * @param gameType the type of game that will be played
     */
    hackboxClient.prototype.startGame = function (roomId, gameType) {
        this.socket.emit('hb-startGame', { roomId: roomId, gameType: gameType });
    };
    ;
    /**
     * Gets all rooms on the hackbox-server.
     * @returns a promise that resolves all rooms on the hackbox server
     */
    hackboxClient.prototype.getRooms = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-getRooms');
            _this.socket.on('hb-roomsData', function (rooms) {
                resolve(rooms);
            });
        });
    };
    /**
     * Adds a new player to an existing game room.
     * @param roomId the id of the room which the player will be added to
     * @param playerName the name of the new player
     * @returns the id of the newly created player
     */
    hackboxClient.prototype.joinRoom = function (roomId, playerName) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-joinRoom', { roomId: roomId, playerName: playerName });
            _this.socket.on('hb-roomConnectionSuccessful', function (playerId) {
                resolve(playerId);
            });
        });
    };
    ;
    /**
     * Registers a function to callback when a game begins
     * @param callbackFn callback function when a player joins. The game type is a parameter of the callback function.
     */
    hackboxClient.prototype.onStartGame = function (callbackFn) {
        this.socket.on('hb-gameStart', function (gameType) {
            callbackFn(gameType);
        });
    };
    ;
    hackboxClient.prototype.emitPlayerAction = function (action) {
        this.socket.emit('hb-playerAction', action);
    };
    hackboxClient.prototype.onGameEvent = function () {
    };
    return hackboxClient;
}());
exports.hackboxClient = hackboxClient;
;
