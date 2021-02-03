import { Injectable } from '@angular/core';
import { hackboxClient } from 'hackbox-client';
import { Room, GameEvent, Player } from 'hackbox-server/dist/model';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomHostService {

  hackboxClient: hackboxClient;

  leader$ = new Subject<Player>();
  leftWord$ = new Subject<string>();
  rightWord$ = new Subject<string>();
  
  /**
   * ReplaySubject will give the most recent value to new subscribers
   * (speaking of subscribers, don't forget to smash that like button)
   */
  room$ = new ReplaySubject<Room>(1);

  constructor() { 
    this.hackboxClient = new hackboxClient('http://localhost:8080');

    this.hackboxClient.onPlayerJoin((updatedRoom: Room) => {
      this.room$.next(updatedRoom)
    });

    this.hackboxClient.onGameEvent((gameEvent: GameEvent) => {
      switch(gameEvent.eventName) {
        case 'freq-roundSetup':
          console.log('round setup in hot service hit')
          this.leader$.next(gameEvent.value.leaderPlayer)
          this.leftWord$.next(gameEvent.value.leftWord);
          this.rightWord$.next(gameEvent.value.rightWord);
          break;
        case 'freq-targetFreq':
          break;
        default:
      } 

      console.log(gameEvent)
    });
  }

  startGame(roomId: string, gameType: string) {
    this.hackboxClient.startGame(roomId, gameType);
  }

  async createRoom(): Promise<void>{
    const newRoom = await this.hackboxClient.createRoom();
    this.room$.next(newRoom);
  }
}
