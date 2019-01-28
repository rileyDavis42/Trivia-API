import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Questions } from '../model/questions';
import { GameService } from '../user/game.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import {Game} from '../user/game';

@Component({
    selector: 'app-trivia-page',
    templateUrl: './trivia-page.page.html',
    styleUrls: ['./trivia-page.page.scss'],
})
export class TriviaPagePage implements OnInit {

    data: Game;
    isLoaded = false;
    user: User;
    activePlayer: string;
    questions: Questions [] = [];
    activeUser: string;
    activeQuestion: string;
    answer: object;
    answers: Array<object>;
    playerAnswer: string;
    answerResult: string;
    resultComment: string;
    count = 0;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private gameService: GameService,
        private userService: UserService ) { }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gameService.getQuestions(this.data).subscribe(data => {
            this.questions = data['results'];
            this.data.questions = this.questions;
            this.isLoaded = true;
            this.data.gameID = this.userService.startNewGame(this.user, this.data);
            console.log(this.data.questions);
        });
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }

    strParse(txt: string): string {
        txt = txt.replace('%20', ' ');
        txt = txt.replace('&#039;', '\'');
        txt = txt.replace('&quot;', '\'');
        return txt;
    }

    askQuestion() {
        this.activeQuestion = this.questions[this.count]['question'];
        this.answers = this.getAnswers();
    }
    getAnswers() {
        const tempArray = [];
       tempArray.push({question: this.questions[this.count]['correct_answer'], correct: true});
        for (let i = 0; i < this.questions[this.count]['incorrect_answers']; i ++) {
            tempArray.push({answer: this.questions[this.count]['incorrect_answers'][i], correct: false});
        }
        return tempArray;
    }

    answerQuestion( questionNumb: number, correct: boolean ) {
        this.gameService.answerQuestion( this.user.id, this.data.gameID, questionNumb, correct );
    }

}
