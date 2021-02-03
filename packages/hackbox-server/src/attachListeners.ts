import { Server, Socket }from 'socket.io';

import { generateId }  from './utils';
import { RoomManager } from './roomManager';
import { GameEvent, GameReference, Player, PlayerAction } from './model';
import { FrequencyGame, FrequencyPlayer } from './frequencyGame';

const roomManager = new RoomManager();

/**
 * Attaches listeners to the socket.io Server.
 * 
 * @param io the socket.io Server that will 
 * @param gameReference the logic for the games types
 */
export function attachListeners (io: Server, gameReference: GameReference): void {
  io.on('connect', (socket: Socket) => {
    /**
     * Room events
     */
    socket.on('hb-createRoom', () => {
      //TODO: replace with socket.io acknowledgement pattern?
      const id = generateId();
      socket.join(id);
      const room = roomManager.addRoom(id, socket.id, 8);
      //TODO: pass game type when creating room
      room.initActiveGame('frequency');
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

    socket.on('hb-startGame', ({ roomId, gameType }) => {
      const players = roomManager.getPlayers(roomId);
      const room = roomManager.getRoom(roomId);
      //todo: don't think we need to send to each player indivudally... we could just send to room
      players.forEach(player => {
        io.to(player.socketId).emit('hb-gameStart', gameType);
      });

      switch (gameType) {
        case 'frequency':
          room.initActiveGame(gameType);
          let freqGame = <FrequencyGame>room.getActiveGame();
          // Send round setup info to all users
          let leaderId = freqGame.getLeader().id;
          const leaderPlayer = room.getPlayer(leaderId);
          const roundSetup: GameEvent = {
            eventName: 'freq-roundSetup',
            value: { leaderPlayer, leftWord: freqGame.leftWord, rightWord: freqGame.rightWord }
          };
          io.to(room.socketId).emit('hb-gameEvent', roundSetup);

          // Send the target freq to only the leader
          freqGame.targetFrequency = Math.floor(Math.random()*180);
          const targetFreq: GameEvent = {
            eventName: 'freq-targetFreq',
            value: freqGame.targetFrequency,
          };
          io.to(leaderPlayer.socketId).emit('hb-gameEvent', targetFreq);

          // Leader has 15s to enter hint
          setTimeout(() => {
            const clue = freqGame.getClueWord();

            //todo: remove sending the clue word here. It should only be sent below when leader submits the word
            let gameEvent: GameEvent = {
              eventName: 'freq-clueWord',
              value: clue
            };
            io.to(room.socketId).emit('hb-gameEvent', gameEvent);
          }, 15000);

          // Players have 15s to make their guess. Afterwhich
          setTimeout(() => {
            let freqPlayers = freqGame.getFreqPlayers();
            const roundResults: GameEvent = {
              eventName: 'freq-roundResults',
              value: { freqPlayers, targetFrequency: freqGame.targetFrequency}
            };
            io.to(room.id).emit('hb-gameEvent', roundResults);
            //TODO: add points
          }, 30000);

          break;
        default:
          break;
      }

      //todo: emit hb-gameStart to room-manager room. Would be nice to have the roomId sent as well


      // setTimeout(() => {
      //   const players = roomManager.getPlayers(roomId);

      //   players.forEach(player => {
      //     io.to(player.socketId).emit('hb-gameOver');
      //   });
      // }, gameReference.demo.gameLength);
    });

    /**
     * When this endpoint is called, it will add the socket to the game-managment io room. 
     * The game-managment room receives all updates about all rooms.
     */
    socket.on('hb-getRooms', () => {
      const rooms = roomManager.getRooms();
      socket.join('game-management')
      io.to(socket.id).emit('hb-roomsData', rooms);
    });

    /**
   * Player events
   */
    socket.on('hb-joinRoom', ({ roomId, playerName }) => {
      if (roomManager.roomExists(roomId) === false) {
        io.to(socket.id).emit('hb-error', 'Room not found');
        return;
      }

      const room = roomManager.getRoom(roomId);
      if (room.players.length >= room.maxPlayers) {
        io.to(socket.id).emit('hb-error', 'Room is full');
        return;
      }

      const playerId = generateId();
      const newPlayer = new Player(playerId, socket.id, playerName);
      roomManager.addPlayer(roomId, newPlayer);
      //Join this user to the game room socket room
      socket.join(room.socketId);

      //Emit to other players in the game room the updated room
      io.to(room.socketId).emit('hb-onPlayerJoin', room);
      
      //send to all room management connections
      io.to('game-management').emit('hb-onPlayerJoin', room); 
      io.to(socket.id).emit('hb-roomConnectionSuccessful', playerId);
    });

    socket.on('hb-leaveRoom', () => {});

    socket.on('hb-getUpdatedData', data => {
      const room = roomManager.getRoom(data.id);

      io.to(room.socketId).emit('hb-update', room);
    });

    socket.on('hb-playerAction', (playerAction: PlayerAction) => {
      const room = roomManager.getRoom(playerAction.roomId);
      const frequencyGame = (<FrequencyGame>room.getActiveGame());
      const frequencyPlayer = frequencyGame.getPlayer(playerAction.playerId);

      switch (playerAction.action.actionName) {
        case 'act-setClueWord':
          frequencyGame.clueWord = playerAction.action.value;
          io.to(room.socketId).emit('hb-playerAction', playerAction)
          break;
        case 'act-updateFreqGuess':
          if (frequencyPlayer) {
            frequencyPlayer.freqGuess = parseInt(playerAction.action.value);
            io.to(room.socketId).emit('hb-playerAction', playerAction);
          }
          break;
        case 'act-setFreqGuess':
    
          break;
        default:
          break;
      }
    });

    socket.on('hb-playerStatusUpdate', data => {
      const room = roomManager.getRoom(data.id);

      roomManager.updatePlayerStatus(
        data.id,
        data.playerId,
        data.playerIsReady
      );

      if (roomManager.allReady(data.id)) {
        io.to(room.socketId).emit('hb-playersReady', true);
      } else {
        io.to(room.socketId).emit('hb-playersReady', false);
      }

      io.to(room.socketId).emit('hb-updateData', room);
    });
  });

  io.on('hb-disconnect', socket => {});
}
