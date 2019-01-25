import {Component} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Game Details',
            url: '/game-details',
            icon: 'ribbon'
        },
        {
            title: 'Trivia Page',
            url: '/trivia-page',
            icon: 'help'
        },
        {
            title: 'Player Stats',
            url: '/player-stats',
            icon: 'stats'
        },
        {
            title: 'Ongoing Games',
            url: '/my-games',
            icon: 'save'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
