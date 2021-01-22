import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public roomId: string = '';
  public playerId: string = '';

  constructor() { }


}
