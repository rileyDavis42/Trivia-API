import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';
import { GameService } from '../user/game.service';
import { NavController } from '@ionic/angular';
import * as _ from 'lodash';
import {Game} from '../user/game';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.page.html',
    styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {

    user: User;
    categories: Object;
    data: Game;

    constructor(private route: ActivatedRoute, private gameService: GameService, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.data = new class implements Game {
            gameID: string;
            category: string;
            categoryID: string;
            difficulty: string;
            players: User[];
            questions: boolean[];
            won: boolean;
        };
        this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
        this.gameService.getCategories().subscribe(data => {
            this.categories = data['trivia_categories'];
        });
    }

    startGame() {
        this.navCtrl.navigateForward(['trivia-page', { data: JSON.stringify(this.data) }]);
    }

    updateCategoryName() {
        this.data.category = _.find(this.categories, { 'id': Number(this.data.categoryID) })['name'];
    }

}
