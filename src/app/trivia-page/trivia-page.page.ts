import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    count = 0;
    gameEnded = false;
    correctAnswer: string;
    isAnswered = false;
    right: boolean;
    player: any;
    players = [] = [];
    playerNames: Array<string> = [];
    winner: any;
    askedQuestions: Array<boolean>;

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
        this.players = this.data.players;
        this.getPlayerNames();
        this.getActivePlayer();
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }

    // Sets the currently active question
    askQuestion() {
        //this.count++;
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
        this.isAnswered = false;
        this.questionAnim = 'default';
        this.answer = null;

        this.askQuestion();
        this.getAnswers();
        this.getActivePlayer();
    }

    // Goes to the stats page upon finishing the game...
    goToStatsPage() {

        this.isAnswered = false;
        this.router.navigate(['game-results', { game: JSON.stringify(this.data) }]);
    }
    getPlayerNames(){
        let playerName: string;
        for(let i = 0; i< this.players.length; i++){
           this.userService.getPlayerData(this.players[i]).subscribe(data => {
               playerName = data['name'];
                this.playerNames.push(playerName);
        });

        }
        return this.playerNames;
    }
    getActivePlayer(){
        let numPlayers = this.players.length;
        let temp = 0;
        temp = this.count % numPlayers;
        this.activePlayer = this.players[temp];
        console.log(this.activePlayer)

    }
}
