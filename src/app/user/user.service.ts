import {Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    usersRef: AngularFireObject;

    constructor(private db: AngularFireDatabase) {
        this.usersRef = this.db.object('Users');
        this.usersRef.valueChanges().subscribe(data => this.usersRef = data);
    }

    getAllUsers() {
        return this.usersRef.valueChanges();
    }
}
