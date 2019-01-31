import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../user/game';

@Component({
    selector: 'app-game-results',
    templateUrl: './game-results.page.html',
    styleUrls: ['./game-results.page.scss'],
})
export class GameResultsPage implements OnInit {

    game: Game;
    questions: Object[];
    score: number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.game = JSON.parse(this.route.snapshot.paramMap.get('game'));
        this.questions = this.game.questions;
        console.log(this.game);
        this.getScore();
    }

    getScore() {
        this.score = 0;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i]['correct']) {
                this.score ++;
            }
        }
        console.log('Score', this.score);
    }

}
