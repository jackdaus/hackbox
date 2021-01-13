import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { hackboxClient } from 'hackbox-client';

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
		private formBuilder: FormBuilder
	) { } 

	ngOnInit(): void {
	}
	
	async onSubmit() {
		const nameInput: string = this.joinGameForm.value['name'];
		const roomCodeInput: string= this.joinGameForm.value['roomCode'];
		const hackbox = new hackboxClient('http://localhost:8080');
		const playerId = await hackbox.joinRoom(roomCodeInput, nameInput);
		console.log(playerId)
	}


}
