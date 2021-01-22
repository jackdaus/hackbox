import { Injectable } from '@angular/core';
import { hackboxClient } from 'hackbox-client';
import { Room, GameEvent } from 'hackbox-server/dist/model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomHostService {

  hackboxClient: hackboxClient;
  
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
      //TODO: switch statement to handle different game events
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
