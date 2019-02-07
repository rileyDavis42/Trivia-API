import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GameService } from '../user/game.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Game } from '../user/game';
import 'confetti-js';

@Component({
    selector: 'app-trivia-page',
    templateUrl: './trivia-page.page.html',
    styleUrls: ['./trivia-page.page.scss'],
})
export class TriviaPagePage implements OnInit {

    data: Game;
    user: User;

    isLoaded = false;

    activePlayer: Object;
    questions: Object[] = [];
    activeUser: string;
    activeQuestion: string;
    answer: any;
    answers: Array<any>;
    count = 0;
    gameEnded = false;
    correctAnswer: string;
    isAnswered = false;
    right: boolean;
    player: any;
    players: Object[] = [];
    winners: Object[] = [];
    askedQuestions: Array<boolean>;
    temp: number = 0;
    score: number = 0;
    round: number = 1;
    confetti: ConfettiGenerator;

    questionAnim = 'default';
    winner: any;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private gameService: GameService,
        private userService: UserService,
        private router: Router) {
    }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.questions = this.data.questions;
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.count = this.data.questionIndex;
        this.players = this.data.players;
        this.confetti = new ConfettiGenerator({target: 'confetti'});

        for (let i = 0; i < this.players.length; i++) {
            this.userService.getPlayerData(this.players[i]).subscribe(data => {
                this.players[i] = data;
                this.players[i]['score'] = 0;
            });

        }

        this.getAnswers();
        this.askQuestion();
        this.getActivePlayer();
        this.isLoaded = true;
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }

    // Sets the currently active question
    askQuestion() {
        // this.count++;
        this.activeQuestion = this.strParse(this.questions[this.count]['question']);
    }

    // Used by askQuestion() to replace html symbols with their proper symbol
    strParse(txt: string): string {
        return this.gameService.strParse(txt);
    }

    // Gets the answers from a certain question and sets them to being either correct or incorrect
    getAnswers() {
        const tempArray = [];
        this.correctAnswer = this.questions[this.count]['correct_answer'];
        tempArray.push({pAnswer: this.questions[this.count]['correct_answer'], correct: true});
        for (let i = 0; i < this.questions[this.count]['incorrect_answers'].length; i++) {
            tempArray.push({pAnswer: this.questions[this.count]['incorrect_answers'][i], correct: false});
        }
        tempArray.sort((a, b) => (a.pAnswer > b.pAnswer) ? 1 : -1);
        this.answers = tempArray;
    }

    // Is called when the player answers the question
    getPlayerAnswer (correct: boolean) {
        this.isAnswered = true;
        this.right = correct;
        this.questionAnim = 'incorrect';
        if (correct) {
            this.questionAnim = 'correct';
            this.getScore();
        }
        this.answerQuestion( this.count, correct );
        this.count++;
        this.gameEnded = this.count >= this.questions.length;
    }

    // Saves the result of the question to firebase
    answerQuestion(questionNumb: number, correct: boolean) {
        this.data.questions[questionNumb]['correct'] = correct;
        this.gameService.answerQuestion( this.data.gameID, questionNumb, correct );
    }

    // Rotates to the next question
    startRound() {
        this.confetti.clear();
        this.isAnswered = false;
        this.questionAnim = 'default';
        this.answer = null;

        this.askQuestion();
        this.getAnswers();
        this.getRound();
        this.getActivePlayer();
        this.winners = this.getWinner();

    }

    // Goes to the stats page upon finishing the game...
    goToStatsPage() {

        this.isAnswered = false;
        this.router.navigate(['game-results', { game: JSON.stringify(this.data), winners: JSON.stringify(this.getWinner()) }]);
    }

    getActivePlayer() {
        const numPlayers = this.players.length;
        this.temp = 0;
        this.temp = this.count % numPlayers;
        this.activePlayer = this.players[this.temp];
    }

    getScore() {
        this.confetti = new ConfettiGenerator({target: 'confetti'});
        this.confetti.render();
        this.players[this.temp]['score']++;
    }

    getWinner() {
        let winners: Object[] = [];
        let maxIndex = 0;
        winners.push(this.players[maxIndex]);
        for (let i = 1; i < this.players.length; i++) {
            if (this.players[i]['score'] > this.players[maxIndex]['score']) {
                maxIndex = i;
                winners = [];
                winners.push(this.players[maxIndex]);
            } else if (this.players[i]['score'] === this.players[maxIndex]['score']) {
            // } else if (this.players[i]['score'] === this.players[maxIndex]['score'] && (this.players[i]['score'] != 0)) {
                winners.push(this.players[i]);
            }
        }
        return winners;
    }
    getRound(){
        this.round = Math.ceil((this.count/this.players.length) + 0.1);
        console.log('round' + this.round)
    }
}
