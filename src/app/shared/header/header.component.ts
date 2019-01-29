import { Component, OnInit } from '@angular/core';
import {User} from "../../user/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
  }

}
