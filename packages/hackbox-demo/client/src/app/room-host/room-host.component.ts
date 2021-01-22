import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'hackbox-server';
import { HackboxClientService } from '../shared/hackbox-client.service';

@Component({
  selector: 'app-room-host',
  templateUrl: './room-host.component.html',
  styleUrls: ['./room-host.component.css']
})
export class RoomHostComponent implements OnInit {

  room!: Room;

  constructor(	
		private router: Router,
    private hackboxClientService: HackboxClientService,
  ) { }

  ngOnInit(): void {
    this.hackboxClientService.getHackboxClient().onPlayerJoin((updatedRoom: Room) => {
      console.log(updatedRoom)
      this.room = updatedRoom;
    });
  }

  async createRoom(): Promise<void> {
    console.log(this.room)
    this.room = await this.hackboxClientService.getHackboxClient().createRoom();
    console.log(this.room);
    this.router.navigate(['room-host', this.room.id]).then(() => {

    });
    console.log(this.room)
	}

	startGame(): void {
    this.hackboxClientService.getHackboxClient().startGame(this.room.id, 'frequency');
    //display game screen
  }

}
