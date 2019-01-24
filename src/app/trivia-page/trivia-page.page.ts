import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-trivia-page',
    templateUrl: './trivia-page.page.html',
    styleUrls: ['./trivia-page.page.scss'],
})
export class TriviaPagePage implements OnInit {

    data = {
        categoryID: '',
        questions: 0,
        difficulty: ''
    };
    isLoaded = false;

    constructor( private route: ActivatedRoute, private navCtrl: NavController ) {
    }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.isLoaded = true;
    }

    goBack() {
        if (confirm('Exit the quiz?')) {
            this.navCtrl.goBack();
        }
    }
}
