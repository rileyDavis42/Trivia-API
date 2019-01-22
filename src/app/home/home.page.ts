import {Component} from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    username: string;
    password: string;

    constructor(private userService: UserService) {
        this.userService.getAllUsers().subscribe(data => {
            console.log(data);
        });
    }

    register() {
        this.userService.registerUser(this.username, this.password);
    }
}
