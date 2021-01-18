import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomManagerComponent } from './room-manager/room-manager.component';
import { WaitingLobbyComponent } from './waiting-lobby/waiting-lobby.component';

const routes: Routes = [
    {
        path: 'join-room',
        component: JoinRoomComponent
    },
    {
        path: 'room-manager',
        component: RoomManagerComponent
    },
    {
        path: 'waiting-lobby/:roomId',
        component: WaitingLobbyComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
