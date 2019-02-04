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
        this.userService.getGames().subscribe(games => {
            this.my_games = [];
            const keys = Object.keys(games);

            // Loops through all of the games
            for (let i = 0; i < keys.length; i++) {
                const game = games[keys[i]];
                game['gameID'] = keys[i];
                if (game.questionIndex < game.questions.length) {

                    // Loops through all the players in the game
                    for (let j = 0; j < game['players'].length; j++) {
                        game.playerNames = [];
                        if (game['players'][j] === this.user['id']) {
                            this.userService.getPlayerData(game['players'][j]).subscribe(data => {
                                game['playerNames'][j] = data['name'];
                            });
                            this.my_games.push(game);
                        } else {
                            this.userService.getPlayerData(game['players'][j]).subscribe(data => {
                                game['playerNames'][j] = data['name'];
                            });
                        }
                    }
                }
            }
            this.isLoaded = true;
        });
    }

    ionViewWillEnter() {
        this.getGames();
    }

}
