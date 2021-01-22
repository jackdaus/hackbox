import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequencyBoardComponent } from './game-types/frequency/frequency-board/frequency-board.component';
import { FrequencyControllerComponent } from './game-types/frequency/frequency-controller/frequency-controller.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomHostComponent } from './room-host/room-host.component';
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
        path: 'room-host/:roomId',
        component: RoomHostComponent,
        children: [
            {
                path: 'frequency',
                component: FrequencyBoardComponent
            }
        ]
    },
    {
        path: 'waiting-lobby/:roomId',
        component: WaitingLobbyComponent
    },
    {
        path: 'game/:roomId',
        children: [
            {
                path: 'frequency',
                component: FrequencyControllerComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
