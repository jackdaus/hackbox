import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { HackboxClientService } from '../shared/hackbox-client.service';

@Component({
	selector: 'app-join-room',
	templateUrl: './join-room.component.html',
	styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
	joinGameForm = new FormGroup({
		name: new FormControl('', Validators.required),
		roomCode: new FormControl('', Validators.required),
	});

	constructor(
		private router: Router,
		private hackboxClientService: HackboxClientService,
	) { } 

	ngOnInit(): void {
	}
	
	async onSubmit() {
		const nameInput: string = this.joinGameForm.value['name'];
		const roomCodeInput: string= this.joinGameForm.value['roomCode'];
		const playerId = await this.hackboxClientService.getHackboxClient().joinRoom(roomCodeInput, nameInput);
		console.log(playerId)
		
		this.router.navigate(['waiting-lobby', roomCodeInput, { name: nameInput }]);
		
		this.hackboxClientService.getHackboxClient().onStartGame(gameType => {
			console.log('game started!')
		});
		
	}


}
