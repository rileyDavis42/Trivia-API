import {Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import {User} from '../user/user';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
    email: string;
    password: string;
    profilePic = '';
    user;
    signedIn = false;

    constructor(private userService: UserService, private fireAuth: AngularFireAuth, private zone: NgZone, private router: Router) {  }

    ngOnInit() {
        if (sessionStorage.getItem('user')) {
            let user: User = JSON.parse(sessionStorage.getItem('user'));
            this.profilePic = user.logo;
            this.userService.registerUser(user);
            this.signedIn = true;
        }
    }

    register() {
        let user = this.user;
        this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(data => {
                this.zone.run(() => {
                    this.profilePic = data['user']['photoURL'];
                    user = {
                        id: data['user']['uid'],
                        name: data['user']['displayName'],
                        email: data['user']['email'],
                        logo: data['user']['photoURL'],
                        games: []
                    };
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.userService.registerUser(user);
                    this.signedIn = true;
                });
                this.router.navigate(['game-details', { user: JSON.stringify(user) }]);
            })
            .catch(error => console.log('Error logging in...', error));
    }
}
