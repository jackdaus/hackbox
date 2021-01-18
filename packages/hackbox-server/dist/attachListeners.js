"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachListeners = void 0;
var utils_1 = require("./utils");
var roomManager_1 = require("./roomManager");
var model_1 = require("./model");
var roomManager = new roomManager_1.RoomManager();
/**
 * Attaches listeners to the socket.io Server.
 *
 * @param io the socket.io Server that will
 * @param gameReference the logic for the games types
 */
function attachListeners(io, gameReference) {
    io.on('connect', function (socket) {
        /**
         * Room events
         */
        socket.on('hb-createRoom', function () {
            //TODO: replace with socket.io acknowledgement pattern?
            var id = utils_1.generateId();
            socket.join(id);
            var room = roomManager.addRoom(id, socket.id, 8);
            io.to(id).emit('hb-roomData', room);
        });
        // socket.on('hb-setGameType', ({ roomId, gameType }) => {
        //   const players = roomManager.getPlayers(roomId);
        //   players.forEach(player => {
        //     io.to(player.socketId).emit(
        //       'hb-setGameType',
        //       gameReference[gameType]
        //     );
        //   });
        // });
        socket.on('hb-startGame', function (_a) {
            var roomId = _a.roomId, gameType = _a.gameType;
            var players = roomManager.getPlayers(roomId);
            players.forEach(function (player) {
                io.to(player.socketId).emit('hb-gameStart', gameType);
            });
            //todo: emit hb-gameStart to room-manager room. Would be nice to have the roomId sent as well
            setTimeout(function () {
                var players = roomManager.getPlayers(roomId);
                players.forEach(function (player) {
                    io.to(player.socketId).emit('hb-gameOver');
                });
            }, gameReference.demo.gameLength);
        });
        /**
         * When this endpoint is called, it will add the socket to the game-managment io room.
         * The game-managment room receives all updates about all rooms.
         */
        socket.on('hb-getRooms', function () {
            var rooms = roomManager.getRooms();
            socket.join('game-management');
            io.to(socket.id).emit('hb-roomsData', rooms);
        });
        /**
       * Player events
       */
        socket.on('hb-joinRoom', function (_a) {
            var roomId = _a.roomId, playerName = _a.playerName;
            if (roomManager.roomExists(roomId) === false) {
                io.to(socket.id).emit('hb-error', 'Room not found');
                return;
            }
            var room = roomManager.getRoom(roomId);
            if (room.players.length >= room.maxPlayers) {
                io.to(socket.id).emit('hb-error', 'Room is full');
                return;
            }
            var playerId = utils_1.generateId();
            var newPlayer = new model_1.Player(playerId, socket.id, playerName);
            roomManager.addPlayer(roomId, newPlayer);
            //Join this user to the game room socket room
            socket.join(room.socketId);
            //Emit to other players in the game room the updated room
            io.to(room.socketId).emit('hb-onPlayerJoin', room);
            //send to all room management connections
            io.to('game-management').emit('hb-onPlayerJoin', room);
            io.to(socket.id).emit('hb-roomConnectionSuccessful', playerId);
        });
        socket.on('hb-leaveRoom', function () { });
        socket.on('hb-getUpdatedData', function (data) {
            var room = roomManager.getRoom(data.id);
            io.to(room.socketId).emit('hb-update', room);
        });
        socket.on('hb-playerAction', function (data) {
            var room = roomManager.getRoom(data.id);
            switch (data.gameType) {
                case 'squatRace':
                    if (data.actionType === 'squat') {
                        roomManager.addToPlayerScore(data.id, data.playerId, 1);
                        io.to(room.socketId).emit('hb-updateData', room);
                    }
                    break;
                default:
                    break;
            }
        });
        socket.on('hb-playerStatusUpdate', function (data) {
            var room = roomManager.getRoom(data.id);
            roomManager.updatePlayerStatus(data.id, data.playerId, data.playerIsReady);
            if (roomManager.allReady(data.id)) {
                io.to(room.socketId).emit('hb-playersReady', true);
            }
            else {
                io.to(room.socketId).emit('hb-playersReady', false);
            }
            io.to(room.socketId).emit('hb-updateData', room);
        });
    });
    io.on('hb-disconnect', function (socket) { });
}
exports.attachListeners = attachListeners;
