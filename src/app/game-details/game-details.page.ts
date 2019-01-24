import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';
import { GameService } from '../user/game.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.page.html',
    styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {

    user: User;
    categories: Object;
    data = {
        categoryID: '',
        questions: 0,
        difficulty: 'medium'
    };

    constructor(private route: ActivatedRoute, private gameService: GameService, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
        this.gameService.getCategories().subscribe(data => {
            this.categories = data['trivia_categories'];
        });
    }

    startGame() {
        this.navCtrl.navigateForward(['trivia-page', { data: JSON.stringify(this.data) }]);
    }

}
