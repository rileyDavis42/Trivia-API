import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Game } from '../user/game';

@Component({
    selector: 'app-player-stats',
    templateUrl: './player-stats.page.html',
    styleUrls: ['./player-stats.page.scss'],
})
export class PlayerStatsPage implements OnInit {

    user: User;
    my_games: Game[] = [];
    won_games: Game[] = [];
    lost_games: Game[] = [];
    questionsAnswered: Object[] = [];
    correctAnswers: Object[] = [];
    incorrectAnswers: Object[] = [];

    categories: Object = {};
    bestCategory = 'N/A';
    worstCategory = 'N/A';
    isLoaded = false;

    constructor( private userService: UserService ) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.userService.getGames().subscribe(games => {
            if(games === null) {
                return;
            }

            // I included the following lines of code to reset the stats and prevent stacking.
            this.my_games = [];
            this.won_games = [];
            this.lost_games = [];
            this.questionsAnswered = [];
            this.correctAnswers = [];
            this.incorrectAnswers = [];
            this.isLoaded = false;

            // Keys holds the references to each game through their ID
            const keys = Object.keys(games);
            // Iterates through each of the games using the keys array
            for ( let i = 0; i < keys.length; i++ ) {

                const game: Game = games[keys[i]];
                const players = game['players'];
                // This for loop will go through each of the players in the game to see if the logged in user exists in the game and
                // whether it was won or lost.
                for ( let j = 0; j < players.length; j++ ) {
                    if (players[j] === this.user.id) {
                        this.didWin(game);
                    }
                }

                // This if statement will check and see if the categories array has a definition for this games category. If it doesn't, it
                // will create one with a value of zero
                if ( typeof(this.categories[game['category']] ) === 'undefined') {
                    this.categories[game['category']] = 0;
                }

                const questions = game['questions'];
                // This for loop will iterate through each of the questions in the game to identify if it belongs to the logged in user
                // and if whether it was correct or incorrect.
                for ( let j = 0; j < questions.length; j++ ) {
                    if ( typeof(questions[j]['correct']) !== 'undefined' && questions[j]['playerID'] === this.user.id) {
                        this.questionsAnswered.push(questions[j]);
                        if ( questions[j]['correct'] ) {
                            this.categories[game['category']] += 1;
                            this.correctAnswers.push(questions[j]);
                        } else if ( !questions[j]['correct'] ) {
                            this.categories[game['category']] -= 1;
                            this.incorrectAnswers.push(questions[j]);
                        }
                    }
                }
            }

            let categories = Object.keys(this.categories);

            // Calculates the best category...
            let maxIndex = 0;
            for ( let i = 1; i < categories.length; i++) {
                if ( this.categories[categories[i]] > this.categories[categories[maxIndex]] ) {
                    maxIndex = i;
                }
            }
            this.bestCategory = categories[maxIndex];

            // Calculates the worst category...
            let minIndex = 0;
            for ( let i = 1; i < categories.length; i++) {
                if ( this.categories[categories[i]] < this.categories[categories[minIndex]] ) {
                    minIndex = i;
                }
            }
            this.worstCategory = categories[minIndex];

            this.isLoaded = true;
        });
    }

    didWin (game: Game) {
        this.my_games.push(game);
        if( game.won ) {
            for( let i = 0; i < game.won.length; i++ ) {
                if ( game.won[i]['id'] === this.user.id ) {
                    this.won_games.push(game);
                    return;
                }
            }
            this.lost_games.push(game);
        }
    }

}
