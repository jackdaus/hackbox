import { Component, OnInit } from '@angular/core';
import { Player, Room } from 'hackbox-server';
import { RoomHostService } from 'src/app/room-host/room-host.service';

@Component({
  selector: 'app-frequency-board',
  templateUrl: './frequency-board.component.html',
  styleUrls: ['./frequency-board.component.css']
})
export class FrequencyBoardComponent implements OnInit {

  room!: Room;
  leader!: Player;
  leftWord: string = '';
  rightWord: string = '';
  
  constructor(
    private roomHostService: RoomHostService,
  ) { }

  ngOnInit(): void {
    this.roomHostService.room$.subscribe((room: Room) => {
      this.room = room;
    });

    this.roomHostService.leftWord$.subscribe((word: string) => {
      this.leftWord = word;
    });

    this.roomHostService.rightWord$.subscribe((word: string) => {
      this.rightWord = word;
    });

    this.roomHostService.leader$.subscribe((player: Player) => {
      this.leader = player;
    });
  }

}
