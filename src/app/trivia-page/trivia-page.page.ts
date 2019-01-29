import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Questions } from '../model/questions';
import { GameService } from '../user/game.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Game } from '../user/game';

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
    answer: any;
    answers: Array<any>;
    playerAnswer: string;
    answerResult: string;
    resultComment: string;
    count = 0;
    gameEnded: boolean = false;
    correctAnswer: string;
    isAnswered: boolean = false;
    right: boolean;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private gameService: GameService,
        private userService: UserService,
        private router: Router) { }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gameService.getQuestions(this.data).subscribe(data => {
            this.questions = data['results'];
            this.data.questions = this.questions;
            this.isLoaded = true;
            this.data.gameID = this.userService.startNewGame(this.user, this.data);
            this.getAnswers();
            this.askQuestion();
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

    startRound(){
        this.askQuestion();
        this.getAnswers();
    }
    askQuestion() {
            this.activeQuestion = this.questions[this.count]['question'];
            console.log("count =  " + this.count);
    }

    getAnswers() {
        const tempArray = [];
        this.correctAnswer = this.questions[this.count]['correct_answer'];
       tempArray.push({pAnswer: this.questions[this.count]['correct_answer'], correct: true});
        for (let i = 0; i < this.questions[this.count]['incorrect_answers'].length; i ++) {
            tempArray.push({pAnswer: this.questions[this.count]['incorrect_answers'][i], correct: false});
        }
        this.answers = tempArray;
    }

    answerQuestion( questionNumb: number, correct: boolean ) {
        this.gameService.answerQuestion( this.user.id, this.data.gameID, questionNumb, correct );
    }

    getPlayerAnswer(correct: boolean) {
        this.isAnswered = true;
        if(correct){
            this.right = true;
            console.log("right");
            // this.user.score++
        }
        else{
            this.right = false;
            console.log("wrong");
        }
        if(this.count < this.questions.length){
            this.gameEnded = false;
        }
        else{
            this.gameEnded = true;
        }
        this.count++;
    }

    goToStatsPage() {
        this.router.navigate(['game-details', { user: JSON.stringify(this.user) }])
    }
}
