import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomManagerComponent } from './room-manager/room-manager.component';

const routes: Routes = [
    {
        path: 'join-room',
        component: JoinRoomComponent
    },
    {
        path: 'room-manager',
        component: RoomManagerComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
