import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomManagerComponent } from './room-manager/room-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaitingLobbyComponent } from './waiting-lobby/waiting-lobby.component';
import { GameFrequencyComponent } from './game-types/game-frequency/game-frequency.component';
import { RoomHostComponent } from './room-host/room-host.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinRoomComponent,
    RoomManagerComponent,
    WaitingLobbyComponent,
    GameFrequencyComponent,
    RoomHostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
