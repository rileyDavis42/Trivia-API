import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../user/game';
import { GameService } from '../user/game.service';
import { NavController } from '@ionic/angular';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import 'confetti-js';

@Component({
    selector: 'app-game-results',
    templateUrl: './game-results.page.html',
    styleUrls: ['./game-results.page.scss'],
})
export class GameResultsPage implements OnInit {

    game: Game;
    user: User;
    questions: Object[];
    won: boolean;
    score: number;
    confetti: any;
    winners = [];
    Math = Math;

    constructor( private route: ActivatedRoute, private gameService: GameService, private navCtrl: NavController, private userService: UserService ) {
    }

    ngOnInit() {
        this.game = JSON.parse(this.route.snapshot.paramMap.get('game'));
        this.winners = JSON.parse(this.route.snapshot.paramMap.get('winners'));
        this.gameService.saveWinner(this.game.gameID, this.winners);
        console.log("game " + this.game.gameID);
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.questions = this.game.questions;
        this.confetti = new window['ConfettiGenerator']({target: 'confetti'});
        this.confetti.clear();
        this.getScore();
    }
    getScore() {
        this.score = 0;
        for (let i = 0; i < this.questions.length; i++) {
            this.userService.getPlayerData(this.questions[i]['playerID']).subscribe(userData => {{
                this.questions[i]['playerName'] = userData['name'];
            }});
            if (this.questions[i]['correct']) {
                this.score ++;
            }
        }
        // Score for playing alone...
        if (this.game.players.length === 1) {
            let percentage = (this.score / this.questions.length);
            this.won = (percentage >= 0.5);
        }
        // Score for multiple players
        else {
            this.won = true;
        }
        if (this.won) { this.confetti.render(); }
        this.confetti.render();

    }

    playAgain() {
        this.navCtrl.navigate('game-details', { });
    }

}
