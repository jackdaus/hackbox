import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { GameReferenceAction, PlayerAction } from 'hackbox-server/dist/model';
import { HackboxClientService } from 'src/app/shared/hackbox-client.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-frequency-controller',
  templateUrl: './frequency-controller.component.html',
  styleUrls: ['./frequency-controller.component.scss']
})
export class FrequencyControllerComponent implements OnInit {

  freq: number = 90;

  constructor(
    private hackboxClientService: HackboxClientService,
		private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  onSliderChange(e: MatSliderChange) {
    console.log(e)
    let act: GameReferenceAction = {
      actionName: 'act-updateFreqGuess',
      value: e.value!.toString(),
      threshold: 0
    } 
    let temp: PlayerAction = {
      roomId: this.sharedService.roomId,
      playerId: this.sharedService.playerId,
      action: act
    }
    this.hackboxClientService.getHackboxClient().emitPlayerAction(temp)
  }

}
