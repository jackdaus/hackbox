import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'hackbox-server';
import { HackboxClientService } from '../shared/hackbox-client.service';
import { RoomHostService } from './room-host.service';

@Component({
  selector: 'app-room-host',
  templateUrl: './room-host.component.html',
  styleUrls: ['./room-host.component.css']
})
export class RoomHostComponent implements OnInit {

  room!: Room;

  constructor(	
    private router: Router,
    private route: ActivatedRoute,
    private roomHostService: RoomHostService,
  ) { }

  ngOnInit(): void {
    this.roomHostService.room$.subscribe((room: Room) => {
      this.room = room;
    });
  }

  async clickCreateRoom(): Promise<void> {
    await this.roomHostService.createRoom();
    this.router.navigate(['room-host', this.room.id]);
    console.log(this.room);
	}

	clickStartGame(): void {
    this.roomHostService.startGame(this.room.id, 'frequency');
    this.router.navigate(['frequency'], { relativeTo: this.route })
  }

}
