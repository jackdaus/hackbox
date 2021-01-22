import { Component, OnInit } from '@angular/core';
import { Room } from 'hackbox-server';
import { RoomHostService } from 'src/app/room-host/room-host.service';

@Component({
  selector: 'app-frequency-board',
  templateUrl: './frequency-board.component.html',
  styleUrls: ['./frequency-board.component.css']
})
export class FrequencyBoardComponent implements OnInit {

  room!: Room;
  
  constructor(
    private roomHostService: RoomHostService,
  ) { }

  ngOnInit(): void {
    this.roomHostService.room$.subscribe((room: Room) => {
      this.room = room;
    });
  }

}
