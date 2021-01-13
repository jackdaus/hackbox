import { Component, OnInit } from '@angular/core';
import { hackboxClient } from 'hackbox-client';
import { Room } from 'hackbox-server';

@Component({
	selector: 'app-room-manager',
	templateUrl: './room-manager.component.html',
	styleUrls: ['./room-manager.component.css']
})
export class RoomManagerComponent implements OnInit {
	rooms: Room[] = [];
	hackboxClient: hackboxClient;

	constructor() { 
		this.hackboxClient = new hackboxClient('http://localhost:8080');
	}

	ngOnInit(): void {
		this.hackboxClient.getRooms().then(res => {
			this.rooms = res;
		});

		this.hackboxClient.onPlayerJoin((updatedRoom: Room) => {
			console.log(updatedRoom)
			const room = this.rooms.find(rm => {
				return rm.id == updatedRoom.id;
			});

			if(room) {
				room.players = updatedRoom.players
			}
		});

	}

	async createRoom(): Promise<void> {
		const room: Room = await this.hackboxClient.createRoom();
		console.log(room)
		this.rooms.push(room);
	}
}
