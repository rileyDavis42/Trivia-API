import { Component, NgZone } from '@angular/core';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    email: string;
    password: string;
    profilePic = '';
    user;

    constructor(private userService: UserService, private fireAuth: AngularFireAuth, private zone: NgZone, private router: Router) {  }

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
                });
                this.router.navigate(['game-details', { user: JSON.stringify(user) }]);
            })
            .catch(error => console.log('Error logging in...', error));
    }
}
