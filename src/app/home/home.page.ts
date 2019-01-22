import {Component} from '@angular/core';
import { UserService } from '../user/user.service';
import { MatButton } from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private userService: UserService) {
        this.userService.getAllUsers().subscribe(data => {
            console.log(data);
        });
    }
}
