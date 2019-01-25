import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {GameService} from '../user/game.service';
import {Questions} from "../model/questions";

@Component({
    selector: 'app-trivia-page',
    templateUrl: './trivia-page.page.html',
    styleUrls: ['./trivia-page.page.scss'],
})
export class TriviaPagePage implements OnInit {

    data = {
        categoryName: '',
        categoryID: '',
        questions: [],
        difficulty: ''
    };
    isLoaded = false;

    questions: Questions [] = [];

    constructor( private route: ActivatedRoute, private navCtrl: NavController, private gameService: GameService ) {
    }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.gameService.getQuestions(this.data).subscribe(data => {
            this.questions = data['results'];
            this.isLoaded = true;
        });
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }
    askQuestion(){

    }


}
