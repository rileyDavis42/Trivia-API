import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.page.html',
    styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {

    user: User;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
    }

}
