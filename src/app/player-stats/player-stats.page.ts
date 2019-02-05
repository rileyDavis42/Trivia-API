import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Game } from '../user/game';
import { Questions } from '../model/questions';

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
    isLoaded = false;

    constructor( private userService: UserService ) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.userService.getGames().subscribe(games => {

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
            for (let i = 0; i < keys.length; i++) {

                const game: Game = games[keys[i]];
                const players = game['players'];
                // This for loop will go through each of the players in the game to see if the logged in user exists in the game and
                // whether it was won or lost.
                for (let j = 0; j < players.length; j++) {
                    if (players[j] === this.user.id) {
                        this.my_games.push(game);
                        if ( game.won === this.user.id ) {
                            this.won_games.push(game);
                        } else if ( typeof(game.won) !== 'undefined' && game.won !== this.user.id ) {
                            this.lost_games.push(game);
                        }
                    }
                }

                const questions = game['questions'];
                // This for loop will iterate through each of the questions in the game to identify if it belongs to the logged in user
                // and if whether it was correct or incorrect.
                for ( let j = 0; j < questions.length; j++ ) {
                    if ( typeof(questions[j]['correct']) !== 'undefined' && questions[j]['playerID'] === this.user.id) {
                        this.questionsAnswered.push(questions[j]);
                        if ( questions[j]['correct'] ) {
                            this.correctAnswers.push(questions[j]);
                        } else if ( !questions[j]['correct'] ) {
                            this.incorrectAnswers.push(questions[j]);
                        }
                    }
                }
            }
            this.calculateBestCategory();
            this.isLoaded = true;
        });
    }

    calculateBestCategory () {
        const categories = [];
        console.log(this.correctAnswers);
        for ( let i = 0; i < this.correctAnswers.length; i++ ) {
            const question = this.correctAnswers[i];
            categories.push(question['category']);
        }
        console.log(categories);
    }

}
