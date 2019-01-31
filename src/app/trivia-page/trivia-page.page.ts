import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    user: User;

    isLoaded = false;

    activePlayer: string;
    questions: Object[] = [];
    activeUser: string;
    activeQuestion: string;
    answer: any;
    answers: Array<any>;
    playerAnswer: string;
    answerResult: string;
    resultComment: string;

    count = 0;
    gameEnded = false;
    correctAnswer: string;
    isAnswered = false;
    right: boolean;

    questionAnim = 'default';

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
        this.getAnswers();
        this.askQuestion();
        this.isLoaded = true;
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }

    // Sets the currently active question
    askQuestion() {
        this.activeQuestion = this.strParse(this.questions[this.count]['question']);
    }

    // Used by askQuestion() to replace html symbols with their proper symbol
    strParse(txt: string): string {
        const findQuotes = RegExp('&#039;', 'g');
        const findQuotes2 = RegExp('&quot;', 'g');
        const findAnd = RegExp('&amp;', 'g');
        txt = txt.replace( findQuotes, '\'');
        txt = txt.replace( findQuotes2, '\'');
        txt = txt.replace( findAnd, '&');
        return txt;
    }

    // Gets the answers from a certain question and sets them to being either correct or incorrect
    getAnswers() {
        const tempArray = [];
        this.correctAnswer = this.questions[this.count]['correct_answer'];
        tempArray.push({pAnswer: this.questions[this.count]['correct_answer'], correct: true});
        for (let i = 0; i < this.questions[this.count]['incorrect_answers'].length; i++) {
            tempArray.push({pAnswer: this.questions[this.count]['incorrect_answers'][i], correct: false});
        }
        this.answers = tempArray;
    }

    // Is called when the player answers the question
    getPlayerAnswer (correct: boolean) {
        this.isAnswered = true;
        this.right = correct;
        this.gameEnded = this.count >= this.questions.length;
        this.questionAnim = 'incorrect';
        if (correct) {
            this.questionAnim = 'correct';
        }
        this.answerQuestion( this.count, correct );
        this.count++;
    }

    // Saves the result of the question to firebase
    answerQuestion(questionNumb: number, correct: boolean) {
        this.gameService.answerQuestion(this.user.id, this.data.gameID, questionNumb, correct);
    }

    // Rotates to the next question
    startRound() {
        this.isAnswered = false;
        this.questionAnim = 'default';
        this.answer = null;

        this.askQuestion();
        this.getAnswers();
    }

    // Goes to the stats page upon finishing the game...
    goToStatsPage() {
        this.router.navigate(['game-details', {user: JSON.stringify(this.user)}]);
    }
}
