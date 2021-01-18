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

  room!: Room; //todo: call getRoom() in constructor so we can remove '!'
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hackboxClientService: HackboxClientService
  ) { 
    //todo: create getRoom() method for hackbox client. call it here.
  }

  ngOnInit(): void {
    //TODO: reconnect to room if re-loading screen
    let roomIdParam = this.route.snapshot.paramMap.get('roomId');
    // ...get room using roomIdParam

    this.hackboxClientService.getHackboxClient().onPlayerJoin(room => {
      this.room = room;
    })

    this.hackboxClientService.getHackboxClient().onStartGame(gameType => {
      this.router.navigate(['game', roomIdParam, gameType]);
    });
    
  }

}
