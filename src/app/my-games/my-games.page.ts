import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Game } from '../user/game';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.page.html',
    styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

    my_games: Game[] = [];
    user: User;
    isLoaded = false;

    constructor( private userService: UserService ) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.userService.getGames(this.user['id']).subscribe(data => {
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                this.my_games.push(data[keys[i]]);
            }
            this.isLoaded = true;
        });
    }

}
