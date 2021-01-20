"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.Player = void 0;
var frequencyGame_1 = require("./frequencyGame");
/**
 * A player of a hackbox game.
 */
var Player = /** @class */ (function () {
    function Player(id, socketId, name) {
        this.id = id;
        this.socketId = socketId;
        this.name = name;
        this.isReady = false;
        this.score = 0;
    }
    return Player;
}());
exports.Player = Player;
/**
 * A room that hosts a game.
 */
var Room = /** @class */ (function () {
    function Room(id, socketId, maxPlayers) {
        this.id = id;
        this.socketId = socketId;
        this.maxPlayers = maxPlayers;
        this.players = [];
    }
    Room.prototype.getPlayer = function (playerId) {
        var player = this.players.find(function (player) {
            return player.id == playerId;
        });
        if (player == null) {
            throw Error('Player not found.');
        }
        return player;
    };
    Room.prototype.initActiveGame = function (gameType) {
        switch (gameType) {
            case 'frequency':
                this.activeGame = new frequencyGame_1.FrequencyGame(this.players);
                break;
            default:
                throw Error('Game type not found.');
        }
    };
    Room.prototype.getActiveGame = function () {
        return this.activeGame;
    };
    return Room;
}());
exports.Room = Room;
