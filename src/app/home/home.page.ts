import {Component} from '@angular/core';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    email: string;
    password: string;

    constructor(private userService: UserService, private fireAuth: AngularFireAuth) {  }

    register() {
        // this.userService.registerUser(this.username, this.password);
        this.fireAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(user => console.log(user));
    }
}
