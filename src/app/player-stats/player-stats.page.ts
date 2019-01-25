import { Component, OnInit } from '@angular/core';
import {User} from "../user/user";

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.page.html',
  styleUrls: ['./player-stats.page.scss'],
})
export class PlayerStatsPage implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
  }

}
