import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Game } from '../user/game';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-my-games',
    templateUrl: './my-games.page.html',
    styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

    my_games: Game[] = [];
    user: User;
    isLoaded = false;

    constructor( private userService: UserService, private navCtrl: NavController ) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.getGames();
    }

    continueGame(game) {
        if (confirm('Continue Game?')) {
            this.navCtrl.navigateForward(['trivia-page', { data: JSON.stringify(game) }]);
        }
    }

    discardGame( gameID: string ) {
        if (confirm('Discard Game?')) {
            this.userService.discardGame(gameID);
            this.getGames();
        }
    }

    getGames() {
        this.isLoaded = false;
        this.my_games = [];
        this.userService.getGames(this.user['id']).subscribe(data => {
            if (data) {
                const keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++) {
                    this.my_games.push(data[keys[i]]);
                    this.my_games[i].gameID = keys[i];
                }
            }
            this.isLoaded = true;
        });
    }

    ionViewWillEnter() {
        this.getGames();
    }

}
