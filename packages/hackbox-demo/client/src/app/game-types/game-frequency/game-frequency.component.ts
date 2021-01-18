import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HackboxClientService } from 'src/app/shared/hackbox-client.service';

@Component({
  selector: 'app-game-frequency',
  templateUrl: './game-frequency.component.html',
  styleUrls: ['./game-frequency.component.scss']
})
export class GameFrequencyComponent implements OnInit {

  freq: number = 90;

  constructor(
    private hackboxClientService: HackboxClientService
  ) { }

  ngOnInit(): void {
  }

  onSliderChange(e: MatSliderChange) {
    console.log(e)
  }

}
