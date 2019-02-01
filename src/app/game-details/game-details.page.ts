import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';
import { GameService } from '../user/game.service';
import { NavController } from '@ionic/angular';
import * as _ from 'lodash';
import { Game } from '../user/game';
import { UserService } from '../user/user.service';
import { Questions } from '../model/questions';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.page.html',
    styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {

    users: User[] = [];
    user: User;
    categories: Object;
    data: Game;
    questionCount = 0;

    constructor (
        private route: ActivatedRoute,
        private gameService: GameService,
        private navCtrl: NavController,
        private userService: UserService) {
    }

    ngOnInit() {
        this.data = new class implements Game {
            gameID: string;
            category: string;
            categoryID: string;
            difficulty: string;
            players: string[] = [];
            questions: Questions[];
            questionIndex = 0;
            won: string;
        };
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gameService.getCategories().subscribe(data => {
            this.categories = data['trivia_categories'];
        });
        this.userService.getAllUsers().subscribe(userData => {
            this.users = [];
            for (const key in userData) {
                this.users.push(userData[key]);
            }
            return;
        });
    }

    startGame() {
        this.gameService.getQuestions(this.data).subscribe(data => {
            this.data.questions = data['results'];
            this.data.players.push(this.user.id);
            this.data.gameID = this.userService.startNewGame(this.data);
            this.navCtrl.navigateForward(['trivia-page', { data: JSON.stringify(this.data) }]);
        });
    }

    updateCategoryName() {
        this.data.category = _.find(this.categories, { 'id': Number(this.data.categoryID) })['name'];
    }

    updateQuestionCount() {
        if (this.data.difficulty && this.data.category) {
            this.gameService.getCategoryAnswerCount( this.data.categoryID ).subscribe(data => {
                this.questionCount = data['category_question_count']['total_' + this.data.difficulty + '_question_count'];
            });
        }
    }

}
