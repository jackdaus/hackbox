import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'hackbox-server';
import { HackboxClientService } from '../shared/hackbox-client.service';

@Component({
  selector: 'app-waiting-lobby',
  templateUrl: './waiting-lobby.component.html',
  styleUrls: ['./waiting-lobby.component.css']
})
export class WaitingLobbyComponent implements OnInit {

  roomId: string = '';
  room!: Room; //todo: call getRoom() in constructor so we can remove '!'

  //TEMP
	gameBegun: boolean = false;
  gameTypeName: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hackboxClientService: HackboxClientService
  ) { 
    //todo: create getRoom() method for hackbox client. call it here.
  }

  ngOnInit(): void {
    let roomIdParam = this.route.snapshot.paramMap.get('roomId');
    this.roomId = roomIdParam ?? '';

    this.hackboxClientService.getHackboxClient().onPlayerJoin(room => {
      console.log('onPlayerJoin run')
      this.room = room;
    })

    this.hackboxClientService.getHackboxClient().onStartGame(gameType => {
      this.gameBegun = true;
      this.gameTypeName = gameType;

      this.router.navigate([gameType]);
    });
    
  }

}
