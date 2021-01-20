"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequencyPlayer = exports.FrequencyGame = void 0;
var FrequencyGame = /** @class */ (function () {
    function FrequencyGame(players) {
        this.leftWord = '';
        this.rightWord = '';
        this.targetFrequency = 0;
        this.clueWord = '';
        this.freqPlayers = this.initFreqPlayers(players);
        this.leaderIndex = 0;
    }
    FrequencyGame.prototype.getPlayer = function (playerId) {
        return this.freqPlayers.find(function (player) { return player.id == playerId; });
    };
    FrequencyGame.prototype.getLeader = function () {
        return this.freqPlayers[this.leaderIndex];
    };
    FrequencyGame.prototype.getClueWord = function () {
        var _a;
        return (_a = this.clueWord) !== null && _a !== void 0 ? _a : 'Clue not set :(';
    };
    FrequencyGame.prototype.getFreqPlayers = function () {
        return this.freqPlayers;
    };
    FrequencyGame.prototype.initFreqPlayers = function (players) {
        var returnVal = [];
        players.forEach(function (player) {
            var freqPlayer = new FrequencyPlayer(player);
            returnVal.push(freqPlayer);
        });
        return returnVal;
    };
    return FrequencyGame;
}());
exports.FrequencyGame = FrequencyGame;
var FrequencyPlayer = /** @class */ (function () {
    function FrequencyPlayer(player) {
        this.id = player.id;
        this.name = player.name;
        this.freqGuess = 0;
    }
    return FrequencyPlayer;
}());
exports.FrequencyPlayer = FrequencyPlayer;
