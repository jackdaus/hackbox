import { Injectable } from '@angular/core';
import { hackboxClient } from 'hackbox-client';

@Injectable({
  providedIn: 'root'
})
export class HackboxClientService {

  private hackboxClient: hackboxClient;

  constructor() { 
    this.hackboxClient = new hackboxClient('http://localhost:8080');
  }

  getHackboxClient() {
    return this.hackboxClient;
  }
}
